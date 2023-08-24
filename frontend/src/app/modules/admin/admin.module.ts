import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdminLayoutComponent,
    AdminOverviewComponent
  ]
})
export class DashboardModule { }
