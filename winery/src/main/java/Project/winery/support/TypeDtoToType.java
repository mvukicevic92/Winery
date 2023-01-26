package Project.winery.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import Project.winery.model.Type;
import Project.winery.service.TypeService;
import Project.winery.web.dto.TypeDTO;

@Component
public class TypeDtoToType implements Converter<TypeDTO, Type>{
	
	@Autowired
	private TypeService typeService;

	@Override
	public Type convert(TypeDTO dto) {
		Type type = new Type();
		
		if(dto.getId() == null) {
			type = new Type();
		}else {
			type = typeService.findOne(dto.getId());
		}
		
		if(type != null) {
			type.setName(dto.getName());
		}
		return type;
	}

}
