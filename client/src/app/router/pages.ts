import loginRoute from '@/pages/login';
import registerRoute from '@/pages/register';
import profileRoute from '@/pages/profile';
import mainMenuRoute from '@/pages/main-menu';
import playRoute from '@/pages/play';

const pages = {
  public: [
    loginRoute,
    registerRoute
  ],
  private: [
    profileRoute,
    mainMenuRoute,
    playRoute
  ]
};

export default pages;