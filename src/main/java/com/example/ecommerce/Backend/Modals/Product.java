    package com.example.ecommerce.Backend.Modals;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.Min;
    import jakarta.validation.constraints.NotBlank;
    import lombok.*;

    import java.util.List;

    @Entity
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Table(name = "Product")
    public class Product {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long productId;

        @NotBlank(message = "Tên sản phẩm không được để trống.")
        private String nameProduct;

        @Min(0) // Thêm ràng buộc cho price
        private double price;

        @NotBlank(message = "Mô tả sản phẩm không được để trống.")
        private String description; // Đổi tên từ 'describe' thành 'description'

        @NotBlank(message = "Slug không được để trống.")
        private String slug;

        @NotBlank(message = "Trạng thái không được để trống.")
        private int status;

        @Min(0) // Thêm ràng buộc cho quantity
        private int quantity; // Sửa tên thuộc tính

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "categoryId")
        private Category category;

        @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Rate> rates;
    }