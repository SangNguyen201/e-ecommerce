# **Overview E-commerce Drile**

### WARNING : API có thể chậm đường truyển và một số lý do khác...

## Giới Thiệu :

#### Đây là một website về nội thất giúp khách hàng của doanh nghiệp tiếp cận và tham khảo các sản phẩm trực quan nhất , có thể tìm hiểu tất cả các thông tin về nội thất mà các khách hàng đang quan tâm , doanh nghiệp cung cấp đầy đủ thông tin về xuất xứ của sản phẩm cũng như các thông tin về công ty để tăng độ tin cậy trong lòng khách hàng. Từ đó có thể thúc đẩy doanh số và trở thành một cửa hàng nội thất tin yêu của thị trường.

## Link Website

-   Link User : https://sangnguyen201.github.io/e-ecommerce/

-   Link Admin : https://sangnguyen201.github.io/e-ecommerce/admin/

## Account admin :

-   sangn6223@gmail.com

-   password:200197

## Công nghệ sử dụng trong dự án cá nhân :

#### Trong dự án cá nhân này tôi viết JS thuần tất cả , mục tiêu để có những kiến thức cơ bản nhất , đặt nền móng cho những Framework và Language khác trong tương lai

-   UI : HTML , SCSS
-   Thư Viện UI : Boostrap5
-   Ngôn Ngữ : Javascript
-   Dữ Liệu : json-server

## Mô tả tính năng :

#### Website sử dụng RESTFUL-API từ : https://ecommerce-drile.onrender.com

#### API này được tạo từ json-server dùng website render.com để deploy RESTFUL-API

## User:

### 1. Trang chủ :

### 1.2 Header :

-   Search sản phẩm theo 1 keyword
-   Tính năng đăng nhập , đăng ký

*   User đã đăng nhập sẽ hiện tên , và click vào chuyển đến trang usersetting hiển thị các thông tin cá nhân , thông tin đơn hàng đã đặt , chỉnh sửa các thông tin cá nhân : Email không được thay đổi trong qua trình chỉnh sửa

-   Giỏ hàng

### 1.3 Banner :

-   Fetch banner từ API .

*   Xử lý DOM lên banner

### 1.4 Category :

-   Show danh mục sản phẩm từ data

*   Chuyển trang và show các sản phẩm theo từng danh mục

### 1.5 List Product :

-   Click list tab show ra những sản phẩm theo từng danh mục

*   Click vào sản phẩm sẽ chuyển trang detailProduct

### 2. Product

-   Click vào các danh mục sẽ lọc ra sản phẩm theo từng danh mục

### 2.1 Shop

### + Bộ Lọc :

-   CATEGORIES : Lọc sản phẩm theo từng danh mục
-   PRICE : Lọc theo giá tiền , click vào all thì show hết tất cả sản phẩm
-   COLOR : Lọc theo màu của từng sản phẩm
-   MATERIAL : Lọc theo chất liệu của từng sản phẩm

### 2.2 Shopping

-   Click vào từng sản phẩm chuyển trang đến detailproduct

### 3. Detailproduct

-   Show các thông tin vào sản phẩm : chọn màu và chất liệu tăng giảm số lượng , User không chọn màu và chất liệu sẽ hiện thông bái popup và chặn sự kiện thêm vào giỏ hàng

*   YOU MAY ALSO LIKE : hiện theo các sản phẩm khác trong từng danh mục
*   Click addtocart hiên popup và click viewcart chuyển đến trang cart
*   lưu thông tin đơn hàng tại localStorage LISTCART

### 4. Cart

-   nhận localStorage LISTCART
-   User kiểm tra lại đơn hàng của mình và xác nhận

*   tăng giảm số lượng và delete
*   Click button checkout chuyển đến trang Checkout

### 5. Checkout

-   User đã đăng nhập thì sẽ hiện thông tin cá nhân vào các trường input, thêm địa chỉ và ghi chú gửi lên admin

*   User đăng nhập lưu thông tại local , tại file checkout get local LOGINUSER và lấy data user và dùng hàm find , nếu có thì show thông tin vào các trường input tại checkout , nếu ko có thì user nhập vào các trường và post thông tin lên data inforUserOrder

-   Click button hoàn tất đơn hàng và remove LISTCART chuyển User đến trang complete

### 6. Complete

-   show tất cả thông tin về đơn hàng và thông tin cần thiết của khách hàng
-   click button Discover để đi đến trang shopping

## Admin:

### Đây là nơi mà user có phân quyền admin mới có thể đăng nhập vào , admin có thể thay đổi các tác vụ liên quan đến website

### 1. Infor Website

#### cập nhật các thông tin về website show ra tại footer , DOM footer để filter vào các trường

#### các tác vụ trong phần admin đều liên quan đền CRUD và push dữ liệu lưu trữ tại data

### tại mục Manage User admin có thể phân quyền cho từng user quyết định user nào có quyền truy cập vào trang admin.
