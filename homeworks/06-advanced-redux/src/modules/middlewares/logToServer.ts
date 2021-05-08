import { Middleware, AnyAction } from "redux";

type LogEvent = Record<string, unknown>;
interface ActionLogConfig<S> {
  [action: string]: (action: AnyAction, state: S) => LogEvent;
}

export const createLogToServer = <S>(
  config: ActionLogConfig<S>
): Middleware => {
  const actionTypesToLog = Object.keys(config);
  return (store) => (next) => (action) => {
    if (actionTypesToLog.includes(action.type)) {
      const event = config[action.type](action, store.getState());
      console.log(event);
      sendEventToServer(event);
    }

    next(action);
  };
};

function sendEventToServer(event: LogEvent): void {
  fetch("http://localhost:3001/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((res) => {
      console.log(res);
      console.log("Log success");
    })
    .catch((ex) => {
      console.error("Log error", ex);
    });
}
