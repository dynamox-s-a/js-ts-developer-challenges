import EventEmitter from 'events';
import httpMock from 'node-mocks-http';
import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtStrategy } from '../guard/jwt.strategy';
import { UsersController } from './users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/PrismaService';
import { CreateUserDto, UpdateUserDto } from '@dynamox-challenge/dto';
import { mockedUsers, mockedUsersPrisma } from '../../mocks/index.mock';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        JwtStrategy,
        { provide: PrismaService, useValue: mockedUsersPrisma },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  it('should create a user', async () => {
    const body: CreateUserDto = {
      name: 'John Doe',
      email: 'john@email.com',
      password: '@AnotherSecurePassword123',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.create(body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual(mockedUsers[1]);
    expect(statusCode).toBe(HttpStatus.CREATED);

    expect(prisma.user.create).toHaveBeenCalled();
  });

  it('should not create a user and return a 400 status code for an invalid e-mail', async () => {
    const body: CreateUserDto = {
      name: 'John Doe',
      email: 'invalid-email',
      password: '@AnotherSecurePassword123',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.create(body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual("Invalid value for attribute 'email' - Message: The email is not valid");
    expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should not create a user and return a 400 status code for an invalid password', async () => {
    const body: CreateUserDto = {
      ...mockedUsers[1],
      password: 'short',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.create(body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual(
      "Invalid value for attribute 'password' - Message: The password has to be at least 8 characters long\nInvalid value for attribute 'password' - Message: The password must contain at least 1 lowercase letter, 1 uppercase letter and 1 number"
    );
    expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('should update a user', async () => {
    const body: UpdateUserDto = {
      name: 'Leonardo Jacomussi',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.update(String(1), body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual({
      id: 1,
      name: 'Leonardo Jacomussi',
      email: mockedUsers[0].email,
    });
    expect(statusCode).toBe(HttpStatus.OK);
    expect(prisma.user.update).toHaveBeenCalled();
  });

  it('should not update a user and return a 400 status code for an invalid e-mail', async () => {
    const body: UpdateUserDto = {
      email: 'invalid-email',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.update(String(1), body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual(
      "Invalid value for attribute 'email' - Message: The email is not valid"
    );
    expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(prisma.user.update).toHaveBeenCalledTimes(0);
  });

  it('should not update a user and return a 404 status code for an invalid user id', async () => {
    const body: UpdateUserDto = {
      name: 'John Doe',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.update(String(800), body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual('User not found');
    expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(prisma.user.update).toHaveBeenCalledTimes(0);
  });

  it('should not update a user and return a 400 status code for an invalid password', async () => {
    const body: UpdateUserDto = {
      ...mockedUsers[1],
      password: 'short',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.update(String(1), body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual(
      "Invalid value for attribute 'password' - Message: The password has to be at least 8 characters long\nInvalid value for attribute 'password' - Message: The password must contain at least 1 lowercase letter, 1 uppercase letter and 1 number"
    );
    expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(prisma.user.update).toHaveBeenCalledTimes(0);
  });

  it('should not update a user and return a 400 status code for an invalid old password', async () => {
    const body: UpdateUserDto = {
      ...mockedUsers[1],
      oldPassword: 'invalid-old-password',
    };

    const res = httpMock.createResponse({ eventEmitter: EventEmitter });

    await controller.update(String(1), body, res);

    const response = res._getJSONData();
    const statusCode = res._getStatusCode();

    expect(response).toEqual(
      "Old password does not match"
    );
    expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(prisma.user.update).toHaveBeenCalledTimes(0);
  });
});