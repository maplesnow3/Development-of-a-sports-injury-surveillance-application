import Login from '../pages/login';
import Registry from '../pages/login/registry';
import DetailsComponent from '../pages/login/components/DetailsComponent';
import MedicalHistory from '../pages/login/components/MedicalHistory';
import MedicalHistory1 from '../pages/login/components/MedicalHistory1';
import InjuryHistory from '../pages/login/components/InjuryHistory';
import InjuryHistory1 from '../pages/login/components/InjuryHistory1';
import ConcussionHistory from '../pages/login/components/ConcussionHistory';
import Home from '../pages/home';
const router:any = [
  {path:'/login',name:'login',element:Login},
  {path:'/registry',name:'registry',element:Registry},
  {path:'/registry/detail',name:'registry',element:DetailsComponent},
  {path:'/registry/history',name:'registry',element:MedicalHistory},
  {path:'/registry/history1',name:'registry',element:MedicalHistory1},
  {path:'/registry/injury',name:'registry',element:InjuryHistory},
  {path:'/registry/injury1',name:'registry',element:InjuryHistory1},
  {path:'/registry/complete',name:'registry',element:ConcussionHistory},
  {path:'/home',name:'home',element:Home},
]

export default router;