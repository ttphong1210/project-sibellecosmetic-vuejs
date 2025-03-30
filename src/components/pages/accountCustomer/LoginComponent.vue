<template>
    <div class="container">
      <div class="returning_customer" style="margin: 5rem 0">
        <p>
          Nếu bạn đã mua sắm với chúng tôi trước đây, vui lòng nhập thông tin chi
          tiết của bạn vào ô bên dưới. Nếu bạn là khách hàng mới, vui lòng Đăng ký
          tài khoản và chuyển đến phần Thanh toán & Giao hàng.
        </p>
        <div class="row contact_form" novalidate="novalidate">
          <div class="col-md-6 login flex-item">
            <div class="wrap">
              <form action="" method="POST">
                <div class="col-md-12 form-group p_star">
                  <span
                    class="placeholder"
                    data-placeholder="Username or Email"
                  ></span>
                  <input
                    type="email"
                    required
                    class="form-control"
                    id="name"
                    name="email"
                  />
                </div>
                <div class="col-md-12 form-group p_star">
                  <span class="placeholder" data-placeholder="Password"></span>
                  <input
                    required
                    class="form-control"
                    id="password"
                    name="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                  />
                  <div class="creat_account">
                    <input type="checkbox" id="check" v-model="showPassword" name="selector" />
                    <label for="check" id="checkdisplay">{{ showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu" }}</label>
                  </div>
                </div>
                <div class="col-md-12 form-group">
                  <button type="submit" value="submit" class="btn submit_btn">
                    Đăng nhập
                  </button>
                  <div class="creat_account">
                    <input type="checkbox" id="f-option" name="selector" />
                    <label for="f-option">Ghi nhớ đăng nhập</label>
                  </div>
                  <a class="lost_pass" href="{{asset('account/forgot-password')}}"
                    >Quên mật khẩu?</a
                  >
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-6 notification-register flex-item">
            <div class="wrap">
              <h5>Khách hàng mới ?</h5>
              <p style="font-family: 'FontAwesome'">
                Đăng ký trang web này cho phép bạn truy cập trạng thái và lịch sử
                đơn hàng của mình. Chúng tôi sẽ nhanh chóng thiết lập một tài
                khoản mới cho bạn. Vì điều này sẽ chỉ yêu cầu bạn cung cấp thông
                tin cần thiết để làm cho quá trình mua hàng nhanh hơn và dễ dàng
                hơn
              </p>
              <button class="btn">
                <a
                  href="{{asset('account/register-customer')}}"
                  style="color: white"
                  class="btn"
                  >Tạo tài khoản</a
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
      export default {
    data() {
      return {
        email: "",
        password: "",
        showPassword: false,

      }
    },
    methods: {
      submit() {
        this.$emit('submit', this.email)
      }
    }
  }


  </script>