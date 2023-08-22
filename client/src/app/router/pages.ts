import loginRoute from '@/pages/login';
import registerRoute from '@/pages/register';
import accountRoute from '@/pages/account';
import mainMenuRoute from '@/pages/main-menu';
import playRoute from '@/pages/play';

const pages = {
  public: [
    loginRoute,
    registerRoute
  ],
  private: [
    accountRoute,
    mainMenuRoute,
    playRoute
  ]
};

export default pages;