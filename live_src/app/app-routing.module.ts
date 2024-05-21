import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'viewstatements/:id',
    loadChildren: () => import('./viewstatements/viewstatements.module').then( m => m.ViewstatementsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'viewstubtransactions/:id',
    loadChildren: () => import('./viewstubtransactions/viewstubtransactions.module').then( m => m.ViewstubtransactionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payrol',
    loadChildren: () => import('./payrol/payrol.module').then( m => m.PayrolPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'addemp',
    loadChildren: () => import('./addemp/addemp.module').then( m => m.AddempPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payshed',
    loadChildren: () => import('./payshed/payshed.module').then( m => m.PayshedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'done',
    loadChildren: () => import('./done/done.module').then( m => m.DonePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'every-friday',
    loadChildren: () => import('./every-friday/every-friday.module').then( m => m.EveryFridayPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
    // canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
    // canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then( m => m.EmployeesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'paychecklist',
    loadChildren: () => import('./paychecklist/paychecklist.module').then( m => m.PaychecklistPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employdetail',
    loadChildren: () => import('./employdetail/employdetail.module').then( m => m.EmploydetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accountants',
    loadChildren: () => import('./accountants/accountants.module').then( m => m.AccountantsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./add-organization/add_organization.module').then( m => m.AddOrganizationModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
