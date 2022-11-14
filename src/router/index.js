import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/pages/Login";
import Admin from "@/components/pages/admin/Admin";

import Category from "@/components/pages/admin/category/Category";
import CategoryAdd from "@/components/pages/admin/category/AddCategory";
import EditCategory from "@/components/pages/admin/category/EditCategory";

import Supplier from "@/components/pages/admin/supplier/Supplier";
import SupplierAdd from "@/components/pages/admin/supplier/AddSupplier";
import Supplieredit from "@/components/pages/admin/supplier/EditSupplier";

import Product from "@/components/pages/admin/product/Product";
import ProductAdd from "@/components/pages/admin/product/AddProduct";
import ProductEdit from "@/components/pages/admin/product/EditProduct";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      redirect: { path: "login" }
    },

    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      redirect: { path: "/admin/category" },

      //...................category...................//

      children: [
        {
          path: "category",
          name: "admin.category",
          component: Category
        },
        {
          path: "category/add",
          name: "category",
          component: CategoryAdd
        },
        {
          path: "category/edit/:id",
          name: "categoryEdit",
          component: EditCategory
        },

        //.................supplier..............//

        {
          path: "supplier",
          name: "admin.supplier",
          component: Supplier
        },
        {
          path: "supplier/add",
          name: "supplier",
          component: SupplierAdd
        },
        {
          path: "supplier/edit/:id",
          name: "supplierEdit",
          component: Supplieredit
        },

        //...............Product............./
        {
          path: "product",
          name: "admin.product",
          component: Product
        },
        {
          path: "product/add",
          name: "AddProduct",
          component: ProductAdd
        },
        {
          path: "product/edit/:id",
          name: "ProductEdit",
          component: ProductEdit
        }
      ]
    }
  ],

  mode: "history"
});
