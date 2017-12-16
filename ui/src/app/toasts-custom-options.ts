import { ToastOptions } from 'ng2-toastr';

export class ToastsCustomOptions extends ToastOptions {
  newestOnTop = true;
  positionClass = 'toast-top-center';
}
