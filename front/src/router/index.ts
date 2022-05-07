import Login from '../pages/login';
import Registry from '../pages/login/registry';
import DetailsComponent from '../pages/login/components/DetailsComponent';
import MedicalHistory from '../pages/login/components/MedicalHistory';
import MedicalHistory1 from '../pages/login/components/MedicalHistory1';
import InjuryHistory from '../pages/login/components/InjuryHistory';
import InjuryHistory1 from '../pages/login/components/InjuryHistory1';
import ConcussionHistory from '../pages/login/components/ConcussionHistory';
import Home from '../pages/home';
import CalendarViewer from '../pages/record_browser/components/CalendarViewer';
import ListViewer from '../pages/record_browser/components/ListViewer';
import RecordViewer from '../pages/record_browser/components/RecordViewer';

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
  {path:'/record_browser/calendar',name:'record_browser',element:CalendarViewer},
  {path:'/record_browser/list',name:'record_browser',element:ListViewer},
  {path:'/record_browser/view_record',name:'record_browser',element:RecordViewer},
]

export default router;