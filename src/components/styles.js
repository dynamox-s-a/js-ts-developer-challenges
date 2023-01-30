import styled from "styled-components";

export const Title = styled.h6`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 35px;
  color: #7d92e8;
`;
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 11px;

  .form__field {
    /* border: 0;
    outline: 0; */
    font-style: normal;
    font-weight: 400;
    /* font-size: 16px;
    line-height: 19px; */
    text-align: center;
    /* color: #454545;
    padding: 0px 0; */
    width: 426px;
    /* height: 41px; */
    /* background: #f4f7fc; */
    /* border-radius: 5px; */

    &::placeholder {
      color: #454545;
    }

    &:nth-child(5) {
      margin-bottom: 25px;
    }
  }

  .error {
    color: #f55353;
    font-size: 15px;
    text-align: left;
    margin-top: 0rem;
    margin-bottom: 0.6rem;
    margin-left: 10px;
  }

  .form__field.input-error,
  select.input-error {
    margin: 0px 0 0px 0;
    border-color: #f55353;
  }

  @media (max-width: 767px) {
    .form__field {
      border-radius: 0px;
      width: 100vw;
      height: 61px;
    }
  }
`;

export const Button = styled.button`
  background-color: #7d92e8;
  border: none;
  border-radius: 10px;
  width: 183px;
  height: 39px;
  margin-top: 25px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
`;