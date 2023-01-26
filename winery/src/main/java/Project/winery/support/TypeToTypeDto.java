package Project.winery.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import Project.winery.model.Type;
import Project.winery.web.dto.TypeDTO;

@Component
public class TypeToTypeDto implements Converter<Type, TypeDTO>{

	@Override
	public TypeDTO convert(Type type) {
		TypeDTO dto = new TypeDTO();
		
		dto.setId(type.getId());
		dto.setName(type.getName());
		return dto;
	}
	
	public List<TypeDTO> convert (List<Type> types){
		List<TypeDTO> dto = new ArrayList<>();
		
		for(Type type: types) {
			dto.add(convert(type));
		}
		return dto;
	}

}
