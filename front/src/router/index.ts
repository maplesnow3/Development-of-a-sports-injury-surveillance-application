import Login from '../pages/login';
import Logout from '../pages/logout';
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
import TeamManage from '../pages/team_func/components/TeamManage';
import NewForm from '../pages/newfrom'
// import TeamMemberManage from '../pages/team_func/components/TeamMemberManage';
import AdminLogin from '../pages/login/adminLogin'
import ResetPassword from '../pages/resetPassword'
import TeamMemberManage from '../pages/team_func/components/TeamMemberManage';

import ChangePassword from '../pages/changePassword';
import ChangeSuccess from '../pages/changePassword/changeSuccess'
import PersonInformation from '../pages/personInformation';
import PersonInformationCoachView from '../pages/personInformationCoachView';

import AdminRecordBrowser from '../pages/admin_record_browser';
import ReloadPage from '../pages/reload_page';

const router:any = [
  {path:'/login',name:'login',element:Login},
  {path:'/logout',name:'login',element:Logout},
  {path:'/registry',name:'registry',element:Registry},
  {path:'/registry/detail',name:'registry',element:DetailsComponent},
  {path:'/registry/history',name:'registry',element:MedicalHistory},
  {path:'/registry/history1',name:'registry',element:MedicalHistory1},
  {path:'/registry/injury',name:'registry',element:InjuryHistory},
  {path:'/registry/injury1',name:'registry',element:InjuryHistory1},
  {path:'/registry/complete',name:'registry',element:ConcussionHistory},
  {path:'/home',name:'home',element:Home},

  {path:'/newform',name:'newform',element:NewForm},

  {path:'/admin_record_browser',name:'admin_record_browser',element:AdminRecordBrowser},

  {path:'/record_browser/calendar',name:'record_browser',element:CalendarViewer},
  {path:'/record_browser/list',name:'record_browser',element:ListViewer},
  {path:'/record_browser/view_record',name:'record_browser',element:RecordViewer},
  {path:'/team_func/teams',name:'team_func',element:TeamManage},
  {path:'/team_func/members',name:'team_func',element:TeamMemberManage},
  {path:'/change-password',name:'ChangePassword',element:ChangePassword},
  {path:'/change-password-success',name:'ChangePasswordSuccess',element:ChangeSuccess},
  {path:'/person-information',name:'PersonInformation',element:PersonInformation},
  {path:'/person-information-coach',name:'PersonInformationCoachView',element:PersonInformationCoachView},
  {path:'/admin-login',name:'AdminLogin',element:AdminLogin},
  {path:'/reset-password',name:'ResetPassword',element:ResetPassword},

  {path:'/reload',name:'reload',element:ReloadPage}
]

export default router;
