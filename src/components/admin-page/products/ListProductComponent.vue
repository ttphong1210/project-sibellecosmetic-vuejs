<template>
  <div class="app-title">
    <ul class="app-breadcrumb breadcrumb side">
      <li class="breadcrumb-item">
        <a href="#">Danh sách sản phẩm</a>
      </li>
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
              <tr v-for="item in listProducts" :key="item.prod_id">
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
                    @click.prevent="deleteProduct(item.prod_id)"
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
              <select
                class="form-control"
                id="exampleSelect1"
                v-model="productToEdit.prod_status"
              >
                <option :value="0">Còn hàng</option>
                <option :value="1">Hết hàng</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label class="control-label">Giá bán</label>
              <input
                class="form-control"
                type="text"
                v-model.number="productToEdit.prod_price"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleSelect1" class="control-label">Danh mục</label>
              <select
                class="form-control"
                id="exampleSelect1"
                v-model="productToEdit.prod_cate"
              >
                <option
                  v-for="category in listCategory"
                  :key="category.cate_id"
                  :value="category.cate_id"
                >
                  {{ category.cate_name }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleSelect1" class="control-label"
                >Thương hiệu</label
              >
              <select
                class="form-control"
                id="exampleSelect1"
                v-model="productToEdit.prod_brand"
              >
                <option
                  v-for="brands in listBrand"
                  :key="brands.brand_id"
                  :value="brands.brand_id"
                >
                  <!-- :selected="productToEdit.brand_id === brands.brand_id" -->

                  {{ brands.brand_name }}
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
            <div class="form-group col-md-12">
              <label class="control-label">Ảnh sản phẩm</label>
              <div id="myfileupload">
                <input
                  type="file"
                  ref="filelInput"
                  @change="onChangeImage"
                  accept="image/*"
                  id="uploadfile"
                  name="ImageUpload"
                  style="display: none"
                />
              </div>
              <div id="thumbbox" v-if="imagePreview">
                <img
                  :src="imagePreview"
                  height="auto"
                  width="10%"
                  alt="Thumb image"
                  id="thumbimage"
                />
                <a class="removeimg" @click.prevent="removeImage"> X </a>
              </div>
              <div id="boxchoice">
                <a
                  href="javascript:"
                  class="Choicefile"
                  @click="$refs.filelInput.click()"
                  ><i class="fas fa-cloud-upload-alt"></i> Chọn ảnh</a
                >
                <p style="clear: both"></p>
              </div>
            </div>
            <div class="form-group col-md-12">
              <label class="control-label">Thư viện ảnh sản phẩm</label>
              <div id="myfileupload">
                <input
                  type="file"
                  ref="filelGalleryInput"
                  @change="onChangeGalleryImage"
                  accept="image/*"
                  multiple
                  id="uploadfilegallery"
                  name="ImageUpload"
                  style="display: none"
                />
              </div>
              <div>
                <!-- Ảnh gallery đã có sẵn -->
                <div
                  id="thumbbox"
                  v-if="currentGallery.length"
                  style="display: flex"
                >
                  <div
                    v-for="(img, index) in currentGallery"
                    :key="'old_' + index"
                    style="width: 10%; margin-right: 20px"
                  >
                    <img
                      :src="`http://192.168.2.1:8080/storage/gallery/${img}`"
                      alt="Gallery"
                      width="100%"
                      height="100%"
                    />
                    <a
                      class="removeimg"
                      @click.prevent="removeOldGalleryImage(index)"
                      >X</a
                    >
                  </div>
                </div>

                <!-- Ảnh gallery mới -->
                <div
                  id="thumbbox"
                  v-if="imageGalleryPreview.length"
                  style="display: flex; margin-top: 10px;"
                >
                  <div
                    style="width: 10%; margin-right: 20px"
                    v-for="(imgSrc, index) in imageGalleryPreview"
                    :key="index"
                  >
                    <img
                      :src="imgSrc"
                      height="100%"
                      width="100%"
                      alt="Thumb image"
                      id="thumbimage"
                    />
                    <a
                      class="removeimg" style="margin-top: 13%;"
                      @click.prevent="removeNewGalleryImage(index)"
                    >
                      X
                    </a>
                  </div>
                </div>
              </div>
              <div id="boxchoice">
                <a
                  href="javascript:"
                  class="Choicefile"
                  @click="$refs.filelGalleryInput.click()"
                  ><i class="fas fa-cloud-upload-alt"></i> Chọn ảnh</a
                >
                <p style="clear: both"></p>
              </div>
            </div>
          </div>
          <a href="#" style="float: right; font-weight: 600; color: #ea0000"
            >Chỉnh sửa sản phẩm nâng cao</a
          >
          <button
            class="btn btn-save"
            type="button"
            @click.prevent="actionSaveEditProduct(productToEdit.prod_id)"
          >
            Lưu lại
          </button>
          <a class="btn btn-cancel" data-dismiss="modal" href="#">Hủy bỏ</a>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
  <!--
MODAL
--></template>
<script>
import api from "@/axios";
import eventBus from "@/utils/eventBus";

export default {
  props: {
    listCategory: {
      type: Array,
      default: () => [],
    },
    listBrand: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      productToEdit: null,
      imagePreview: null,
      imageGalleryPreview: [],
      imageFile: null,
      imageGalleryFile: [],
      currentGallery: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(page = 1) {
      eventBus.emit("show-loading");
      try {
        const response = await api.get(`admin/product/?page=${page}`);
        this.listProducts = response.data.listProduct.data;
        this.currentPage = response.data.listProduct.current_page;
        this.totalPages = response.data.listProduct.last_page;
      } catch (error) {
        console.log("error", error);
      } finally {
        eventBus.emit("hide-loading");
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchData(page);
      }
    },
    setProductToEdit(product) {
      this.productToEdit = { ...product };
      this.imageFile = product.prod_img;
      this.imagePreview = `http://192.168.2.1:8080/storage/avatar/${this.imageFile}`;
      this.imageGalleryFile = [];
      this.imageGalleryPreview = [];
      this.currentGallery = product.prod_gallery
        ? product.prod_gallery.split("|")
        : [];

    },
    async deleteProduct(productID) {
      if (confirm("Bạn có chắc chắn xoá không ?")) {
        try {
          eventBus.emit("show-loading");
          const response = await api.get(`admin/product/delete/${productID}`);
          this.message = response.data.message;
          this.$router.go();
          alert(this.message);
        } catch (error) {
          alert("Vui lòng thử lại sau !");
        } finally {
          eventBus.emit("hide-loading");
        }
      }
    },
    async actionSaveEditProduct(productID) {
      try {
        console.log(this.currentGallery);
        eventBus.emit("show-loading");
        const formData = new FormData();
        for (const key in this.productToEdit) {
          if (key !== "prod_img" && key !== "prod_gallery") {
            formData.append(key, this.productToEdit[key]);
          }
        }
        if (this.imageFile instanceof File) {
          formData.append("imageAvatar", this.imageFile);
        }
        if (this.imageGalleryFile && this.imageGalleryFile.length > 0) {
          this.imageGalleryFile.forEach((file) => {
            formData.append("gallery[]", file);
          });
        }
        if (this.currentGallery && this.currentGallery.length > 0) {
          formData.append("currentGallery", this.currentGallery);
        }
        const response = await api.post(
          `admin/product/edit/${productID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.message = response.data.message;
        alert(this.message);
        this.$router.go();
      } catch (error) {
        console.log("Error", error);
      } finally {
        eventBus.emit("hide-loading");
      }
    },
    onChangeImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    removeImage() {
      this.imageFile = null;
      this.imagePreview = null;
      this.$refs.filelInput.value = null;
    },
    onChangeGalleryImage(event) {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        this.imageGalleryFile.push(file);
        this.imageGalleryPreview.push(URL.createObjectURL(file));
      });
    },
    removeOldGalleryImage(index) {
      this.currentGallery.splice(index, 1);
    },
    removeNewGalleryImage(index) {
      this.imageGalleryFile.splice(index, 1);
      this.imageGalleryPreview.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.edit {
  margin-left: 5px;
}
.removeimg {
  cursor: pointer;
  color: red !important;
  font-size: 20px;
  margin-top: 5px;
  display: inline-block;
  position: absolute;
  top: 15px;
}
#boxchoice {
  margin-top: 10px;
}
</style>
