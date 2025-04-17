<template>
  <div class="app-title">
    <ul class="app-breadcrumb breadcrumb side">
      <li class="breadcrumb-item">
        <a href="products.html">Danh sách sản phẩm</a>
      </li>
      <li class="breadcrumb-item"><a href=""> Kết quả tìm kiếm: {{ keyword }}</a></li>
    </ul>
    <div id="clock"></div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <div class="tile">
        <div class="tile-body">
          <div class="row element-button">
            <div class="col-sm-2">
              <a
                class="btn btn-add btn-sm"
                href="form-add-products.html"
                title="Thêm"
                ><i class="fas fa-plus"></i> Tạo mới sản phẩm</a
              >
            </div>
            <div class="col-sm-2">
              <a
                class="btn btn-delete btn-sm nhap-tu-file"
                type="button"
                title="Nhập"
                onclick="myFunction(this)"
                ><i class="fas fa-file-upload"></i> Tải từ file</a
              >
            </div>

            <div class="col-sm-2">
              <a
                class="btn btn-delete btn-sm print-file"
                type="button"
                title="In"
                onclick="myApp.printTable()"
                ><i class="fas fa-print"></i> In dữ liệu</a
              >
            </div>
            <div class="col-sm-2">
              <a
                class="btn btn-delete btn-sm print-file js-textareacopybtn"
                type="button"
                title="Sao chép"
                ><i class="fas fa-copy"></i> Sao chép</a
              >
            </div>

            <div class="col-sm-2">
              <a class="btn btn-excel btn-sm" href="" title="In"
                ><i class="fas fa-file-excel"></i> Xuất Excel</a
              >
            </div>
            <div class="col-sm-2">
              <a
                class="btn btn-delete btn-sm pdf-file"
                type="button"
                title="In"
                onclick="myFunction(this)"
                ><i class="fas fa-file-pdf"></i> Xuất PDF</a
              >
            </div>
            <div class="col-sm-2">
              <a
                class="btn btn-delete btn-sm"
                type="button"
                title="Xóa"
                onclick="myFunction(this)"
                ><i class="fas fa-trash-alt"></i> Xóa tất cả
              </a>
            </div>
          </div>
          <table class="table table-hover table-bordered" id="sampleTable">
            <thead>
              <tr>
                <th width="10"><input type="checkbox" id="all" /></th>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Số lượng</th>
                <th>Tình trạng</th>
                <th>Giá tiền</th>
                <th>Danh mục</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in productList" :key="item.prod_id">
                <td width="10">
                  <input type="checkbox" name="check1" value="1" />
                </td>
                <td>713090{{ item.prod_id }}</td>
                <td>{{ item.prod_name }}</td>
                <td>
                  <img
                    :src="getProductAvatar(item.prod_img)"
                    alt=""
                    width="100px;"
                  />
                </td>
                <td>{{ item.quantity }}</td>
                <td>
                  <span
                    :class="
                      item.prod_status === 0
                        ? 'badge bg-success'
                        : 'badge bg-danger'
                    "
                    >{{
                      item.prod_status === 0 ? "Còn hàng" : "Hết hàng"
                    }}</span
                  >
                </td>
                <td>{{ formatCurrency(item.prod_price) }}</td>
                <td>{{ item.cate_name }}</td>
                <td>
                  <button
                    class="btn btn-primary btn-sm trash"
                    type="button"
                    title="Xóa"
                    onclick="myFunction(this)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button
                    class="btn btn-primary btn-sm edit"
                    type="button"
                    title="Sửa"
                    id="show-emp"
                    data-toggle="modal"
                    data-target="#ModalUP"
                    @click="setProductToEdit(item)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <div class="d-flex justify-content-end mt-3">
            <nav>
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage - 1)"
                    >Lùi</a
                  >
                </li>
                <li
                  v-for="page in totalPages"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === currentPage }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(page)"
                    >{{ page }}</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="changePage(currentPage + 1)"
                    >Tiếp</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--MODAL-->
  <div
    class="modal fade"
    id="ModalUP"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
    data-backdrop="static"
    data-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="form-group col-md-12">
              <span class="thong-tin-thanh-toan">
                <h5>Chỉnh sửa thông tin sản phẩm cơ bản</h5>
              </span>
            </div>
          </div>
          <div class="row" v-if="productToEdit">
            <div class="form-group col-md-6">
              <label class="control-label">Mã sản phẩm </label>
              <input
                class="form-control"
                type="number"
                :value="'713090' + productToEdit?.prod_id"
                readonly
              />
            </div>
            <div class="form-group col-md-6">
              <label class="control-label">Tên sản phẩm</label>
              <input
                class="form-control"
                type="text"
                required
                v-model="productToEdit.prod_name"
              />
            </div>
            <div class="form-group col-md-6">
              <label class="control-label">Số lượng</label>
              <input
                class="form-control"
                type="number"
                required
                v-model="productToEdit.quantity"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleSelect1" class="control-label"
                >Tình trạng sản phẩm</label
              >
              <select class="form-control" id="exampleSelect1">
                <option value="0" :selected="productToEdit.prod_status">
                  Còn hàng
                </option>
                <option value="1" :selected="productToEdit.prod_status">
                  Hết hàng
                </option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label class="control-label">Giá bán</label>
              <input
                class="form-control"
                type="text"
                :value="formatCurrency(productToEdit.prod_price)"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleSelect1" class="control-label">Danh mục</label>
              <select class="form-control" id="exampleSelect1">
                <option
                  v-for="category in listCategory"
                  :key="category.cate_id"
                  :value="category.cate_id"
                  :selected="productToEdit.cate_id === category.cate_id"
                >
                  {{ category.cate_name }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleSelect1" class="control-label"
                >Sản phẩm nổi bật</label
              >
              <select
                class="form-control"
                id="exampleSelect1"
                v-model="productToEdit.prod_featured"
              >
                <option :value="1">Có</option>
                <option :value="0">Không</option>
              </select>
            </div>
          </div>
          <a href="#" style="float: right; font-weight: 600; color: #ea0000"
            >Chỉnh sửa sản phẩm nâng cao</a
          >

          <button class="btn btn-save" type="button">Lưu lại</button>
          <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
  <!--MODAL-->
</template>
<script>
import api from '@/axios';
import eventBus from '@/utils/eventBus';

export default {
  props: {
    listCategory: {
      type: Array,
      default: () => []
    },
    listBrand: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      productList: [],
      keyword: this.$route.query.result || "",
      productToEdit: null,
    };
  },
  watch: {
    $route(to, from){
        if(to.query.result !== from.query.result){
            this.keyword = to.query.result;
            this.searchProducts();
        }
    }
  },
  mounted() {
    this.searchProducts()
  },
  methods: {
    async searchProducts() {
      try {
        eventBus.emit('show-loading');
        const response = await api.get(`admin/product/search`, {
          params: { inputQuery: this.keyword },
        });
        this.productList = response.data.productList;
      } catch (error) {
        console.log("Error", error);
      } finally {
        eventBus.emit("hide-loading");
      }
    },
    setProductToEdit(product){
        this.productToEdit = {...product};
    }
  },
};
</script>
