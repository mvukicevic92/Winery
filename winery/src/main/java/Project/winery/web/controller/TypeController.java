package Project.winery.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Project.winery.model.Type;
import Project.winery.service.TypeService;
import Project.winery.support.TypeToTypeDto;
import Project.winery.web.dto.TypeDTO;

@RestController
@RequestMapping(value = "/api/types", produces = MediaType.APPLICATION_JSON_VALUE)
public class TypeController {
	
	@Autowired
	private TypeService typeService;
	
	@Autowired
	private TypeToTypeDto toTypeDto;
	
	@GetMapping
	public ResponseEntity<List<TypeDTO>> getAll(){
		List<Type> types = typeService.findAll();
		
		if(types != null) {
			return new ResponseEntity<>(toTypeDto.convert(types), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
