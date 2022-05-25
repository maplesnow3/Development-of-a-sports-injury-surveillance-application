from django.urls import path
from Backend.views import user_views
from Backend.views import injury_views
from Backend.views import team_views


# API list
urlpatterns = [
    # Login api
    path('login', user_views.loginUser, name='login'),
    path('logout', user_views.logoutUser, name='logout'),
    # User related functions
    path('user/register', user_views.registerUser, name='register'),
    path('user/change_password', user_views.changeUserSelfPassword, name='change_password'),
    path('user/personal_info/get/<str:info_user_id_in>', user_views.getPersonalInfoByUserId, name='get_personal_info'),
    path('user/personal_info/set', user_views.setPersonalInfoForSelf, name='set_personal_info'),
    path('user/baseline/get/<str:baseline_user_id_in>', user_views.getBaselineByUserId, name='get_baseline'),
    path('user/access_code/get/<str:code_user_id_in>', user_views.getAccessCodeByUserId, name='get_access_code'),
    path('user/access_code/set', user_views.setAccessCodeForSelf, name='set_access_code'),
    #   - Admin only func
    #     TODO
    # path('user/reset_password', user_views.resetUserPassword, name='reset_password'),
    # injury form functions
    path('injury_form/new', injury_views.createNewForm, name='create_new_form'),
    path('injury_form/get/<str:form_id>', injury_views.getFormById, name='get_form_by_id'),
    path('injury_form/get_dates/<str:viewed_user_id_in>/from/<str:start_date>/to/<str:end_date>', injury_views.getFormDatesByUserIdInRange, name='get_form_dates_by_user_id_in_range'),
    path('injury_form/get_dates/<str:viewed_user_id_in>', injury_views.getFormDatesByUserId, name='get_form_dates_by_user_id'),
    # Team functions
    path('team/new', team_views.setNewTeam, name='set_new_team'),
    path('team/remove', team_views.removeTeam, name='remove_team'),
    path('team/get_all', team_views.getAllTeams, name='get_all_teams'),
    path('team/members/get/<str:team_id_in>', team_views.getTeamMembers, name='get_teams_members'),
    path('team/members/add', team_views.addTeamMembers, name='add_teams_members'),
    path('team/members/remove', team_views.removeTeamMembers, name='remove_teams_members'),
    #   - Admin only func
    #     TODO
    # path('team/get_all_players', team_views.getAllPlayers, name='get_all_players'),
]
