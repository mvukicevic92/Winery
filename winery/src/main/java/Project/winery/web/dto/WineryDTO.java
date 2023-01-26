package Project.winery.web.dto;

public class WineryDTO {
	
	private Long id;
	
	private String name;
	
	private Integer quantity;
	
	private Integer yearOfEstablishment;

	public WineryDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getYearOfEstablishment() {
		return yearOfEstablishment;
	}

	public void setYearOfEstablishment(Integer yearOfEstablishment) {
		this.yearOfEstablishment = yearOfEstablishment;
	}
	
	

}
