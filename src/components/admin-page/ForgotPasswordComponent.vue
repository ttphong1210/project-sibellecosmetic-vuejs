<template>
  <div class="bg-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-2">
                        Forgot Your Password?
                      </h1>
                      <p class="mb-4" style="font-size: 12px;">
                        Chỉ cần nhập địa chỉ email của bạn bên dưới và chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu!
                      </p>
                    </div>
                    <form class="user">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <a
                        href="login.html"
                        class="btn btn-primary btn-user btn-block"
                      >
                        Reset Password
                      </a>
                    </form>
                    <hr />
                    <div class="text-center">
                      <a class="small" href="register.html"
                        >Create an Account!</a
                      >
                    </div>
                    <div class="text-center">
                      <a class="small" href="/login-auth.html"
                        >Bạn đã có tài khoản? Đăng nhập!</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-primary {
  min-height: 100vh;
  background-color: #4e73df;
  background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
  background-size: cover;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #6e707e;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d3e2;
  border-radius: 0.35rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-control:focus {
  color: #6e707e;
  background-color: #fff;
  border-color: #bac8f3;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}
form.user .custom-checkbox.small label {
  line-height: 1.5rem;
}
form.user .custom-checkbox.small label {
  line-height: 1.5rem;
}
form.user .form-control-user {
  font-size: 0.925rem;
  border-radius: 10rem;
  padding: 1.75rem 1.25rem;
}
form.user .btn-user {
  font-size: 0.925rem;
  border-radius: 10rem;
  padding: 0.75rem 1rem;
}
.btn-primary{
  color: #fff;
  background-color: #4e73df;
  border-color: #4e73df;
}
.btn-primary:hover {
  color: #fff;
  background-color: #2e59d9;
  border-color: #2653d4;
}
.btn-primary.focus,
.btn-primary:focus {
  color: #fff;
  background-color: #2e59d9;
  border-color: #2653d4;
  box-shadow: 0 0 0 0.2rem rgba(105, 136, 228, 0.5);
}
</style>