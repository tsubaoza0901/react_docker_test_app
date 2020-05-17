import { useBindAction } from '../usehelpers/useBindActions';
import { RightValue } from '../configs/right';

export const SET_USER = 'USER_SET_USER' as const;

type UserInfo = {
  id: number;
  userName: string;
  role: {
    roleAccessRights: {
      accessRightId: RightValue;
    }[];
  };
};

export const setUser = (userInfo: UserInfo) => ({ type: SET_USER, userInfo });

export type Actions = ReturnType<typeof setUser>;

export const useSetUser = () => useBindAction(setUser);
