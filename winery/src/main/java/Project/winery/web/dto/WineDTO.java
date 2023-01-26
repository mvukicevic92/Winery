package Project.winery.web.dto;

import javax.validation.constraints.Positive;



public class WineDTO {
	
	private Long id;
	
	private String name;
	
	private Integer year;
	
	private String description;
	
	@Positive
	private Double priceForBottle;
	
	
	private Integer availableBottles;
	
	@Positive
	private Long wineryId;
	private String wineryName;
	
	@Positive
	private Long typeId;
	private String typeName;
	
	public WineDTO() {
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
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getPriceForBottle() {
		return priceForBottle;
	}
	public void setPriceForBottle(Double priceForBottle) {
		this.priceForBottle = priceForBottle;
	}
	public Integer getAvailableBottles() {
		return availableBottles;
	}
	public void setAvailableBottles(Integer availableBottles) {
		this.availableBottles = availableBottles;
	}
	public Long getWineryId() {
		return wineryId;
	}
	public void setWineryId(Long wineryId) {
		this.wineryId = wineryId;
	}
	public String getWineryName() {
		return wineryName;
	}
	public void setWineryName(String wineryName) {
		this.wineryName = wineryName;
	}
	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	
	

}
