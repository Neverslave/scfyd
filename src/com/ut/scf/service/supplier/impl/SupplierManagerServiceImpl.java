package com.ut.scf.service.supplier.impl;

import javax.annotation.Resource;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sun.javafx.collections.MappingChange.Map;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.dao.auto.SupplierInfoMapper;
import com.ut.scf.reqbean.supplier.SupplierManagerReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.supplier.ISupplierManagerService;

@Service("supplierManagerService")
public class SupplierManagerServiceImpl implements ISupplierManagerService {
	@Resource
	private SupplierInfoMapper supplierInfoMapper;	
	@Override
	
	@Transactional(readOnly=true)
	public BaseRespBean getsupplierList(Map<String, Object> paramMap, PageInfoBean page) {
		// TODO 
		return null;
	}

	@Override
	public BaseRespBean addSupplier(SupplierManagerReqBean supplierManagerReqBean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseRespBean updateSupplier(SupplierManagerReqBean supplierManagerReqBean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseRespBean startProcess(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseRespBean doAgree(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseRespBean reApply(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseRespBean agreeThenAdd(SupplierManagerReqBean supplierManagerReqBean) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseRespBean agreeThenMod(SupplierManagerReqBean supplierManagerReqBean) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
