package Project.winery.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import Project.winery.model.Wine;
import Project.winery.service.TypeService;
import Project.winery.service.WineService;
import Project.winery.service.WineryService;
import Project.winery.web.dto.WineDTO;

@Component
public class WineDtoToWine implements Converter<WineDTO, Wine>{
	
	@Autowired
	private WineService wineService;
	
	@Autowired
	private TypeService typeService;
	
	@Autowired
	private WineryService wineryService;

	@Override
	public Wine convert(WineDTO dto) {
		Wine wine = new Wine();
		
		if(dto.getId() == null) {
			wine = new Wine();
		}else {
			wine = wineService.findOne(dto.getId());
		}
		
		if(wine != null) {
			wine.setName(dto.getName());
			wine.setYear(dto.getYear());
			wine.setDescription(dto.getDescription());
			wine.setPriceForBottle(dto.getPriceForBottle());
			wine.setAvailableBottles(dto.getAvailableBottles());
			wine.setType(typeService.findOne(dto.getTypeId()));
			wine.setWinery(wineryService.findOne(dto.getWineryId()));
		}
		
		return wine;
	}

}
