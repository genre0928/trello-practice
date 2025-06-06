import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: IToDo[];
}

export const localStorageKey = "toDoState";
const localStorageEffect =
  // key = localStorageEffect 변수의 파라미터(string는 타입)


    (key: string) =>
    ({ setSelf, onSet }: any) => {
      // 1. 초기값 로드
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      // 2. 상태가 바뀔 때마다 저장
      onSet((newValue: IToDoState) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      });
    };
// 제네릭 타입은 default에서 관리할 상태의 타입을 의미하는 것임
export const toDoState = atom<IToDoState>({
  key: "toDoState",
  default: {
    "해야할 일": [],
    "진행중": [],
    "완료": [],
  },
  effects_UNSTABLE: [localStorageEffect(localStorageKey)],
});
