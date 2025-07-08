import { Mutex } from "await-semaphore";

type GroupKey = string | Symbol;

const mutexMap = new Map<GroupKey, Mutex>();
const anyGroup = Symbol("anyGroup");

function getMutex(group: GroupKey) {
  if (group === anyGroup) {
    return new Mutex();
  }

  let mutex = mutexMap.get(group);
  if (mutex == null) {
    mutex = new Mutex();
    mutexMap.set(group, mutex);
  }
  return mutex;
}

function useWithGroup<T = void>(
  group: GroupKey,
  func: () => Promise<T>
): Promise<T> {
  const mutex = getMutex(group);

  return mutex.use(func);
}

export {
    type GroupKey,
    anyGroup,
    getMutex,
    useWithGroup
}