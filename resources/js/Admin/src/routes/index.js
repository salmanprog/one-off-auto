import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

//Web Pages
import Home from '../pages/Web/Home'
import ContentPages from '../pages/Web/Content/index'
import InviteUser from '../pages/Web/InviteUser'
//Admin Pages
import PrivateRoute from "./privateRoute";
import AuthRoute from "./authRoute";
import Login from '../pages/Admin/Auth/login'
import Dashboard from '../pages/Admin/Dashboard'
import ContractorDashboard from '../pages/Admin/ContractorDashboard'
import CustomerDashboard from '../pages/Admin/CustomerDashboard'
import ManagerDashboard from '../pages/Admin/ManagerDashboard'
import CrewDashboard from '../pages/Admin/CrewDashboard'
import ProfileSettings from '../pages/Admin/ProfileSettings'
/**** CKS ROUTE *****/
import ApplicationContractor from '../pages/Admin/Contractor'
import ApplicationContractorAdd from '../pages/Admin/Contractor/add'
import ApplicationContractorEdit from '../pages/Admin/Contractor/edit'
import ApplicationContractorView from '../pages/Admin/Contractor/view'

import ApplicationCustomer from '../pages/Admin/Customer'
import ApplicationCustomerAdd from '../pages/Admin/Customer/add'
import ApplicationCustomerEdit from '../pages/Admin/Customer/edit'
import ApplicationCustomerView from '../pages/Admin/Customer/view'

import ApplicationManager from '../pages/Admin/Manager'
import ApplicationManagerAdd from '../pages/Admin/Manager/add'
import ApplicationManagerEdit from '../pages/Admin/Manager/edit'
import ApplicationManagerView from '../pages/Admin/Manager/view'

import ApplicationContractorManager from '../pages/Admin/ContractorManager'
import ApplicationContractorManagerAdd from '../pages/Admin/ContractorManager/add'
import ApplicationContractorManagerEdit from '../pages/Admin/ContractorManager/edit'
import ApplicationContractorManagerView from '../pages/Admin/ContractorManager/view'

import ApplicationCrew from '../pages/Admin/Crew'
import ApplicationCrewAdd from '../pages/Admin/Crew/add'
import ApplicationCrewEdit from '../pages/Admin/Crew/edit'
import ApplicationCrewView from '../pages/Admin/Crew/view'

import ApplicationCrewInvite from '../pages/Admin/CrewInvite'
import ApplicationCrewInviteAdd from '../pages/Admin/CrewInvite/add'
import ApplicationCrewInviteEdit from '../pages/Admin/CrewInvite/edit'

import ApplicationContractorCrew from '../pages/Admin/ContractorCrew'
import ApplicationContractorCrewAdd from '../pages/Admin/ContractorCrew/add'
import ApplicationContractorCrewEdit from '../pages/Admin/ContractorCrew/edit'
import ApplicationContractorCrewView from '../pages/Admin/ContractorCrew/view'

import ApplicationJob from '../pages/Admin/Jobs'
import ApplicationJobAdd from '../pages/Admin/Jobs/add'
import ApplicationJobEdit from '../pages/Admin/Jobs/edit'
import ApplicationJobView from '../pages/Admin/Jobs/view'

import ApplicationCustomerJob from '../pages/Admin/CustomerJobs'
import ApplicationCustomerJobAdd from '../pages/Admin/CustomerJobs/add'
import ApplicationCustomerJobEdit from '../pages/Admin/CustomerJobs/edit'
import ApplicationCustomerJobView from '../pages/Admin/CustomerJobs/view'

import ApplicationContractorJob from '../pages/Admin/ContractorJobs'
import ApplicationContractorJobAdd from '../pages/Admin/ContractorJobs/add'
import ApplicationContractorJobEdit from '../pages/Admin/ContractorJobs/edit'
import ApplicationContractorJobView from '../pages/Admin/ContractorJobs/view'

import ApplicationAdminJob from '../pages/Admin/AdminJobs'
import ApplicationAdminJobAdd from '../pages/Admin/AdminJobs/add'
import ApplicationAdminJobEdit from '../pages/Admin/AdminJobs/edit'
import ApplicationAdminJobView from '../pages/Admin/AdminJobs/view'

import ApplicationCrewJob from '../pages/Admin/CrewJobs'
import ApplicationCrewJobView from '../pages/Admin/CrewJobs/view'

import ApplicationAdminService from '../pages/Admin/AdminServices'
import ApplicationAdminServiceAdd from '../pages/Admin/AdminServices/add'
import ApplicationAdminServiceEdit from '../pages/Admin/AdminServices/edit'

import ApplicationAdminProductCategory from '../pages/Admin/AdminProductCategory'
import ApplicationAdminProductCategoryAdd from '../pages/Admin/AdminProductCategory/add'
import ApplicationAdminProductCategoryEdit from '../pages/Admin/AdminProductCategory/edit'

import ApplicationAdminProduct from '../pages/Admin/AdminProduct'
import ApplicationAdminProductAdd from '../pages/Admin/AdminProduct/add'
import ApplicationAdminProductEdit from '../pages/Admin/AdminProduct/edit'

import ApplicationAdminOrder from '../pages/Admin/AdminOrder'
import ApplicationAdminOrderView from '../pages/Admin/AdminOrder/view'

import ApplicationUserOrder from '../pages/Admin/UserOrder'
import ApplicationUserOrderView from '../pages/Admin/UserOrder/view'

import ApplicationFeedbackQuestion from '../pages/Admin/AdminFeedbackQuestion'
import ApplicationFeedbackQuestionAdd from '../pages/Admin/AdminFeedbackQuestion/add'
import ApplicationFeedbackQuestionEdit from '../pages/Admin/AdminFeedbackQuestion/edit'

import ApplicationUserFeedback from '../pages/Admin/UserFeedback'
import ApplicationUserFeedbackAdd from '../pages/Admin/UserFeedback/add'
import ApplicationUserFeedbackEdit from '../pages/Admin/UserFeedback/edit'
import ApplicationUserFeedbackView from '../pages/Admin/UserFeedback/view'

import ApplicationAdminFeedback from '../pages/Admin/AdminFeedback'
import ApplicationAdminFeedbackView from '../pages/Admin/AdminFeedback/view'

import ApplicationBuildingType from '../pages/Admin/AdminBuildingTypes'
import ApplicationBuildingTypeAdd from '../pages/Admin/AdminBuildingTypes/add'
import ApplicationBuildingTypeEdit from '../pages/Admin/AdminBuildingTypes/edit'

import ApplicationUser from '../pages/Admin/Users'
import ApplicationUserEdit from '../pages/Admin/Users/edit'
import ApplicationUserView from '../pages/Admin/Users/view'
import ApplicationContent from '../pages/Admin/ApplicationContent'
import ApplicationContentEdit from '../pages/Admin/ApplicationContent/edit'
import ApplicationContentAdd from '../pages/Admin/ApplicationContent/add'
import ApplicationSettings from '../pages/Admin/ApplicationSettings'
import ApplicationProductCategory from '../pages/Admin/Store/categoryview'
import ApplicationProduct from '../pages/Admin/Store/view'
import Cart from '../pages/Admin/Cart'

import ChangePassword from "../pages/Admin/ChangePassword";

/**** CKS ROUTE END*****/
const Loading = ()=>{
    console.log('Content')
    return (
        <div className="pt-3 text-center">
            <div className="sk-spinner sk-spinner-pulse"></div>
        </div>
    )
};


function App() {
    return (
        <Routes>
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/content/:slug" element={<ContentPages />}/>
        <Route exact path="/invite/:slug" element={<InviteUser />}/>
        <Route exact path="/admin/login/zekkmdvhkm" element={<AuthRoute><Login /></AuthRoute>} />
        <Route exact path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route exact path="/admin/profilesettings" element={<PrivateRoute><ProfileSettings /></PrivateRoute>}/>
        <Route exact path="/admin/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>}/>
        <Route exact path="/admin/application-setting" element={<PrivateRoute><ApplicationSettings /></PrivateRoute>}/>
        <Route exact path="/admin/content" element={<PrivateRoute><ApplicationContent /></PrivateRoute>}/>
        <Route exact path="/admin/content/edit/:slug?" element={<PrivateRoute><ApplicationContentEdit /></PrivateRoute>}/>
        <Route exact path="/admin/content/add" element={<PrivateRoute><ApplicationContentAdd /></PrivateRoute>}/>

        <Route exact path="/admin/contractor" element={<PrivateRoute><ApplicationContractor /></PrivateRoute>}/>
        <Route exact path="/admin/contractor/add" element={<PrivateRoute><ApplicationContractorAdd /></PrivateRoute>}/>
        <Route exact path="/admin/contractor/edit/:slug?" element={<PrivateRoute><ApplicationContractorEdit /></PrivateRoute>}/>
        <Route exact path="/admin/contractor/view/:slug?" element={<PrivateRoute><ApplicationContractorView /></PrivateRoute>}/>
        
        <Route exact path="/admin/customer" element={<PrivateRoute><ApplicationCustomer /></PrivateRoute>}/>
        <Route exact path="/admin/customer/add" element={<PrivateRoute><ApplicationCustomerAdd /></PrivateRoute>}/>
        <Route exact path="/admin/customer/edit/:slug?" element={<PrivateRoute><ApplicationCustomerEdit /></PrivateRoute>}/>
        <Route exact path="/admin/customer/view/:slug?" element={<PrivateRoute><ApplicationCustomerView /></PrivateRoute>}/>

        <Route exact path="/admin/manager" element={<PrivateRoute><ApplicationManager /></PrivateRoute>}/>
        <Route exact path="/admin/manager/add" element={<PrivateRoute><ApplicationManagerAdd /></PrivateRoute>}/>
        <Route exact path="/admin/manager/edit/:slug?" element={<PrivateRoute><ApplicationManagerEdit /></PrivateRoute>}/>
        <Route exact path="/admin/manager/view/:slug?" element={<PrivateRoute><ApplicationManagerView /></PrivateRoute>}/>

        <Route exact path="/admin/contractor-centers" element={<PrivateRoute><ApplicationContractorManager /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-centers/add" element={<PrivateRoute><ApplicationContractorManagerAdd /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-centers/edit/:slug?" element={<PrivateRoute><ApplicationContractorManagerEdit /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-centers/view/:slug?" element={<PrivateRoute><ApplicationContractorManagerView /></PrivateRoute>}/>

        <Route exact path="/admin/crew" element={<PrivateRoute><ApplicationCrew /></PrivateRoute>}/>
        <Route exact path="/admin/crew/add" element={<PrivateRoute><ApplicationCrewAdd /></PrivateRoute>}/>
        <Route exact path="/admin/crew/edit/:slug?" element={<PrivateRoute><ApplicationCrewEdit /></PrivateRoute>}/>
        <Route exact path="/admin/crew/view/:slug?" element={<PrivateRoute><ApplicationCrewView /></PrivateRoute>}/>

        <Route exact path="/admin/invitecrew" element={<PrivateRoute><ApplicationCrewInvite /></PrivateRoute>}/>
        <Route exact path="/admin/invitecrew/add" element={<PrivateRoute><ApplicationCrewInviteAdd /></PrivateRoute>}/>
        <Route exact path="/admin/invitecrew/edit/:slug?" element={<PrivateRoute><ApplicationCrewInviteEdit /></PrivateRoute>}/>

        <Route exact path="/admin/contractor-crew" element={<PrivateRoute><ApplicationContractorCrew /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-crew/add" element={<PrivateRoute><ApplicationContractorCrewAdd /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-crew/edit/:slug?" element={<PrivateRoute><ApplicationContractorCrewEdit /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-crew/view/:slug?" element={<PrivateRoute><ApplicationContractorCrewView /></PrivateRoute>}/>

        <Route exact path="/admin/job" element={<PrivateRoute><ApplicationJob /></PrivateRoute>}/>
        <Route exact path="/admin/job/add" element={<PrivateRoute><ApplicationJobAdd /></PrivateRoute>}/>
        <Route exact path="/admin/job/edit/:slug?" element={<PrivateRoute><ApplicationJobEdit /></PrivateRoute>}/>
        <Route exact path="/admin/job/view/:slug?" element={<PrivateRoute><ApplicationJobView /></PrivateRoute>}/>

        <Route exact path="/admin/customer-job" element={<PrivateRoute><ApplicationCustomerJob /></PrivateRoute>}/>
        <Route exact path="/admin/customer-job/add" element={<PrivateRoute><ApplicationCustomerJobAdd /></PrivateRoute>}/>
        <Route exact path="/admin/customer-job/edit/:slug?" element={<PrivateRoute><ApplicationCustomerJobEdit /></PrivateRoute>}/>
        <Route exact path="/admin/customer-job/view/:slug?" element={<PrivateRoute><ApplicationCustomerJobView /></PrivateRoute>}/>

        <Route exact path="/admin/contractor-job" element={<PrivateRoute><ApplicationContractorJob /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-job/add" element={<PrivateRoute><ApplicationContractorJobAdd /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-job/edit/:slug?" element={<PrivateRoute><ApplicationContractorJobEdit /></PrivateRoute>}/>
        <Route exact path="/admin/contractor-job/view/:slug?" element={<PrivateRoute><ApplicationContractorJobView /></PrivateRoute>}/>

        <Route exact path="/admin/admin-job" element={<PrivateRoute><ApplicationAdminJob /></PrivateRoute>}/>
        <Route exact path="/admin/admin-job/add" element={<PrivateRoute><ApplicationAdminJobAdd /></PrivateRoute>}/>
        <Route exact path="/admin/admin-job/edit/:slug?" element={<PrivateRoute><ApplicationAdminJobEdit /></PrivateRoute>}/>
        <Route exact path="/admin/admin-job/view/:slug?" element={<PrivateRoute><ApplicationAdminJobView /></PrivateRoute>}/>

        <Route exact path="/admin/crew-job" element={<PrivateRoute><ApplicationCrewJob /></PrivateRoute>}/>
        <Route exact path="/admin/crew-job/view/:slug?" element={<PrivateRoute><ApplicationCrewJobView /></PrivateRoute>}/>

        <Route exact path="/admin/services" element={<PrivateRoute><ApplicationAdminService /></PrivateRoute>}/>
        <Route exact path="/admin/services/add" element={<PrivateRoute><ApplicationAdminServiceAdd /></PrivateRoute>}/>
        <Route exact path="/admin/services/edit/:slug?" element={<PrivateRoute><ApplicationAdminServiceEdit /></PrivateRoute>}/>

        <Route exact path="/admin/product-category" element={<PrivateRoute><ApplicationAdminProductCategory /></PrivateRoute>}/>
        <Route exact path="/admin/product-category/add" element={<PrivateRoute><ApplicationAdminProductCategoryAdd /></PrivateRoute>}/>
        <Route exact path="/admin/product-category/edit/:slug?" element={<PrivateRoute><ApplicationAdminProductCategoryEdit /></PrivateRoute>}/>

        <Route exact path="/admin/product" element={<PrivateRoute><ApplicationAdminProduct /></PrivateRoute>}/>
        <Route exact path="/admin/product/add" element={<PrivateRoute><ApplicationAdminProductAdd /></PrivateRoute>}/>
        <Route exact path="/admin/product/edit/:slug?" element={<PrivateRoute><ApplicationAdminProductEdit /></PrivateRoute>}/>

        <Route exact path="/admin/store" element={<PrivateRoute><ApplicationProductCategory /></PrivateRoute>}/>
        <Route exact path="/admin/product-view/:id?" element={<PrivateRoute><ApplicationProduct /></PrivateRoute>}/>
        <Route exact path="/admin/cart" element={<PrivateRoute><Cart /></PrivateRoute>}/>

        <Route exact path="/admin/orders" element={<PrivateRoute><ApplicationAdminOrder /></PrivateRoute>}/>
        <Route exact path="/admin/orders/view/:slug?" element={<PrivateRoute><ApplicationAdminOrderView /></PrivateRoute>}/>

        <Route exact path="/admin/user-orders" element={<PrivateRoute><ApplicationUserOrder /></PrivateRoute>}/>
        <Route exact path="/admin/user-orders/view/:slug?" element={<PrivateRoute><ApplicationUserOrderView /></PrivateRoute>}/>

        <Route exact path="/admin/users" element={<PrivateRoute><ApplicationUser /></PrivateRoute>}/>
        <Route exact path="/admin/users/edit/:slug?" element={<PrivateRoute><ApplicationUserEdit /></PrivateRoute>}/>
        <Route exact path="/admin/users/view/:slug?" element={<PrivateRoute><ApplicationUserView /></PrivateRoute>}/>

        <Route exact path="/admin/feedback_question" element={<PrivateRoute><ApplicationFeedbackQuestion /></PrivateRoute>}/>
        <Route exact path="/admin/feedback_question/add" element={<PrivateRoute><ApplicationFeedbackQuestionAdd /></PrivateRoute>}/>
        <Route exact path="/admin/feedback_question/edit/:slug?" element={<PrivateRoute><ApplicationFeedbackQuestionEdit /></PrivateRoute>}/>

        <Route exact path="/admin/building_types" element={<PrivateRoute><ApplicationBuildingType /></PrivateRoute>}/>
        <Route exact path="/admin/building_types/add" element={<PrivateRoute><ApplicationBuildingTypeAdd /></PrivateRoute>}/>
        <Route exact path="/admin/building_types/edit/:slug?" element={<PrivateRoute><ApplicationBuildingTypeEdit /></PrivateRoute>}/>

        <Route exact path="/admin/feedback" element={<PrivateRoute><ApplicationUserFeedback /></PrivateRoute>}/>
        <Route exact path="/admin/feedback/add" element={<PrivateRoute><ApplicationUserFeedbackAdd /></PrivateRoute>}/>
        <Route exact path="/admin/feedback/edit/:slug?" element={<PrivateRoute><ApplicationUserFeedbackEdit /></PrivateRoute>}/>
        <Route exact path="/admin/feedback/view/:slug?" element={<PrivateRoute><ApplicationUserFeedbackView /></PrivateRoute>}/>

        <Route exact path="/admin/users-feedbacks" element={<PrivateRoute><ApplicationAdminFeedback /></PrivateRoute>}/>
        <Route exact path="/admin/users-feedbacks/view/:slug?" element={<PrivateRoute><ApplicationAdminFeedbackView /></PrivateRoute>}/>
        
        </Routes>
    );
}

export default App;
