/*
* @Author: monkey
* @Date:   2018-09-13 10:16:42
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-13 10:19:48
*/
import Layout from '@/views/layout/Layout.vue'
import ResetPassword from '@/views/user/ResetPassword.vue'
import Setting from '@/views/user/Setting.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import PayPassword from '@/views/user/PayPassword.vue'
import PaymentMethods from '@/views/user/PaymentMethods.vue'


const userRouter = {
	path: '/user',
  component: Layout,
  children: [
  	{
  		path: 'resetPassword',
      component: ResetPassword,
      name: 'resetPassword',
      meta: {
      	title: 'changePasswordTitle',
      }
  	},
    {
      path: 'setting',
      component: Setting,
      name: 'setting',
      meta: {
        title: 'settingTitle',
      }
    },
    {
      path: 'userInfo',
      component: UserInfo,
      name: 'userInfo',
      meta: {
        title: 'userInfoTitle',
      }
    },
    {
      path: 'payPassword',
      component: PayPassword,
      name: 'payPassword',
      meta: {
        title: 'payPasswordTitle',
      }
    },
    {
      path: 'paymentMethods',
      component: PaymentMethods,
      name: 'paymentMethods',
      meta: {
        title: 'paymentMethodsTitle',
      }
    }
  ]
}


export default userRouter;