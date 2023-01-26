package Project.winery.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import Project.winery.model.Wine;
import Project.winery.web.dto.WineDTO;

@Component
public class WineToWineDto implements Converter<Wine, WineDTO>{

	@Override
	public WineDTO convert(Wine wine) {
		WineDTO dto = new WineDTO();
		dto.setId(wine.getId());
		dto.setName(wine.getName());
		dto.setYear(wine.getYear());
		dto.setDescription(wine.getDescription());
		dto.setPriceForBottle(wine.getPriceForBottle());
		dto.setAvailableBottles(wine.getAvailableBottles());
		dto.setTypeId(wine.getType().getId());
		dto.setTypeName(wine.getType().getName());
		dto.setWineryId(wine.getWinery().getId());
		dto.setWineryName(wine.getWinery().getName());
		return dto;
	}
	
	public List<WineDTO> convert (List<Wine> wines){
		List<WineDTO> dto = new ArrayList<>();
		
		for(Wine wine : wines) {
			dto.add(convert(wine));
		}
		return dto;
	}

}
