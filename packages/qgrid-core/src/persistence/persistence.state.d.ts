import { Command } from '../command/command';
import { PersistenceStorage } from './persistence.storage';

export declare type PersistenceSchedule = 'onDemand' | 'onStateChange';

export declare class PersistenceState {
  id: string;
  defaultGroup: string;
  schedule: PersistenceSchedule;

  storage: PersistenceStorage;

  load: Command;
  remove: Command;
  create: Command;
  modify: Command;
  reset: Command;
  setDefault: Command;
  settings: { [key: string]: string[] };
}
