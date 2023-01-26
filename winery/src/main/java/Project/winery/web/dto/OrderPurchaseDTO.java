package Project.winery.web.dto;

public class OrderPurchaseDTO {
	
	private Long id;
	
	private Integer quantity;

	public OrderPurchaseDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer qunatity) {
		this.quantity = qunatity;
	}
	
	

}
