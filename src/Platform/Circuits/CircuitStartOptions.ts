import { LogLevel } from '../Logging/Logger';

export interface CircuitStartOptions {
  configureSignalR: (builder: signalR.HubConnectionBuilder) => void;
  logLevel: LogLevel;
  reconnectionOptions: ReconnectionOptions;
  reconnectionHandler?: ReconnectionHandler;
}

export function resolveOptions(userOptions?: Partial<CircuitStartOptions>): CircuitStartOptions {
    const result = { ...defaultOptions, ...userOptions };

    // The spread operator can't be used for a deep merge, so do the same for subproperties
    if (userOptions && userOptions.reconnectionOptions) {
      result.reconnectionOptions = { ...defaultOptions.reconnectionOptions, ...userOptions.reconnectionOptions };
    }

    return result;
}

export interface ReconnectionOptions {
  maxRetries: number;
  retryIntervalMilliseconds: number;
  dialogId: string;
}

export interface ReconnectionHandler {
  onConnectionDown(options: ReconnectionOptions, error?: Error): void;
  onConnectionUp(): void;
}

const defaultOptions: CircuitStartOptions = {
    configureSignalR: (_) => { },
    logLevel: LogLevel.Warning,
    reconnectionHandler: {
      onConnectionDown: function (options, error) { 
          //se c'è un errore, ci riconnettiamo; altrimenti è una disconnessione voluta
          if(error) window['Blazor'].reconnect();
      },
      onConnectionUp: function () {}
    },
    reconnectionOptions: {
      maxRetries: 0,
      retryIntervalMilliseconds: 3000,
      dialogId: 'components-reconnect-modal',
    },
};
