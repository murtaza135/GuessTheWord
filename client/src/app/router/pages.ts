import login from '@/pages/login';
import register from '@/pages/register';
import home from "@/pages/home";
import profile from '@/pages/profile';
import mainMenu from '@/pages/main-menu';
import play from '@/pages/play';
import connectLocalAccount from "@/pages/link-local-account";

export const pages = {
  public: [
    login,
    register,
    home
  ],
  private: [
    profile,
    mainMenu,
    play,
    connectLocalAccount
  ]
};
