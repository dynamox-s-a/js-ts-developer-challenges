import { FetchStatus } from "../../types";

export enum Sensors {
  tcAg = "TcAg",
  tcAf = "TcAs",
  hf = "HF+",
}

export interface IMonitoringPointStore {
  id: number;
  name: string;
  machineName: string;
  machineType: string;
  sensor: Sensors;
}

export interface IMonitoringPointsState {
  readonly monitoringPoints: IMonitoringPointStore[];
  readonly sensors: Sensors[];
  readonly status: FetchStatus;
  readonly error: string | undefined;
}

export interface IMonitoringPoint {
  id: number;
  name: string;
  machineId: number;
  sensor: Sensors;
}
