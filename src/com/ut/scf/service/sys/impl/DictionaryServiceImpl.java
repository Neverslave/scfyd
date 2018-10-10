package com.ut.scf.service.sys.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ut.scf.dao.auto.SysDictItemMapper;
import com.ut.scf.pojo.auto.SysDictItem;
import com.ut.scf.pojo.auto.SysDictItemExample;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.MapRespBean;
import com.ut.scf.service.sys.IDictionaryService;

@Service("dictionaryService")
public class DictionaryServiceImpl implements IDictionaryService {

	@Resource
	private SysDictItemMapper dictItemMapper;

	@Override
	public List<SysDictItem> loadDict(List<String> typeIds) {
		SysDictItemExample example = new SysDictItemExample();
		SysDictItemExample.Criteria criteria = example.createCriteria();
		criteria.andTypeIdIn(typeIds);
		List<SysDictItem> dictItems = dictItemMapper.selectByExample(example);
		return dictItems;
	}

	@Override
	public BaseRespBean loadAllDict() {
		SysDictItemExample example = new SysDictItemExample();
		List<SysDictItem> dictItems =  dictItemMapper.selectByExample(example);
		Map<String,List<Map<String,String>>> dictListMaps = new HashMap<String,List<Map<String,String>>>();
		for (SysDictItem sysDictItem : dictItems) {
			
			Map<String,String> dictMaps = new HashMap<String,String>();
			dictMaps.put("itemKey", sysDictItem.getItemKey());
			dictMaps.put("itemValue", sysDictItem.getItemValue());
			if(!dictListMaps.containsKey(sysDictItem.getTypeId())) {
				List<Map<String,String>> dictList = new ArrayList<Map<String,String>>();
				dictList.add(dictMaps);
				dictListMaps.put(sysDictItem.getTypeId(), dictList);
			}else {
				dictListMaps.get(sysDictItem.getTypeId()).add(dictMaps);	
			}

		}
		MapRespBean respBean = new MapRespBean();
		respBean.setListMap(dictListMaps);
		return respBean;
	}

}
