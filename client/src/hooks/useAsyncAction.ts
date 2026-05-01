import { notifyForError, notifyForSMth } from "../helpers/notifyUser";

type AsyncActionOptions<T> = {
  action: () => Promise<T>;
  successMessage: (res: T) => string;
};

export const useAsyncAction = () => {
  const run = async <T>({
    action,
    successMessage,
  }: AsyncActionOptions<T>): Promise<T | null> => {
    try {
      const res = await action();
      notifyForSMth(successMessage(res));
      return res;
    } catch (error) {
      notifyForError(error as string);
      return null;
    }
  };
  return run;
};
