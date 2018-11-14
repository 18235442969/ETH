/*
* @Author: monkey
* @Date:   2018-09-13 10:16:42
* @Last Modified by:   monkey
* @Last Modified time: 2018-09-13 10:19:48
*/
import Layout from '@/views/layout/Layout.vue'
import ResetPassword from '@/views/user/ResetPassword.vue'


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
  	}
  ]
}


export default userRouter;