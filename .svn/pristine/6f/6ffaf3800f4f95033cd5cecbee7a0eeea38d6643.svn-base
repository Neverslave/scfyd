package com.ut.scf.service.project.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.ProcessRepeatCheckMapper;
import com.ut.scf.pojo.auto.ProcessRepeatCheck;
import com.ut.scf.pojo.auto.ProcessRepeatCheckExample;
import com.ut.scf.pojo.auto.ProcessRepeatCheckExample.Criteria;
import com.ut.scf.service.project.IProcessRepeatChkService;

@Service("processRepeatChkService")
public class ProcessRepeatChkServiceImpl implements IProcessRepeatChkService {

	@Resource
	private ProcessRepeatCheckMapper checkMapper;

	@Override
	@Transactional(readOnly = true)
	public boolean isProcessExist(ProcessRepeatCheck checkInfo) {
		ProcessRepeatCheckExample checkExample = new ProcessRepeatCheckExample();
		Criteria criteria = checkExample.createCriteria();
		criteria.andProcessKeyEqualTo(checkInfo.getProcessKey());
		criteria.andItemKeyEqualTo(checkInfo.getItemKey());
		criteria.andItemValueEqualTo(checkInfo.getItemValue());

		if (checkMapper.countByExample(checkExample) > 0) {
			return true;
		}

		return false;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public int insert(ProcessRepeatCheck checkInfo) {
		checkInfo.setRecUid(ScfUUID.generate());

		return checkMapper.insert(checkInfo);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public int delete(ProcessRepeatCheck checkInfo) {
		ProcessRepeatCheckExample checkExample = new ProcessRepeatCheckExample();
		Criteria criteria = checkExample.createCriteria();
		criteria.andProcessKeyEqualTo(checkInfo.getProcessKey());
		criteria.andItemKeyEqualTo(checkInfo.getItemKey());
		criteria.andItemValueEqualTo(checkInfo.getItemValue());

		return checkMapper.deleteByExample(checkExample);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public int deleteByProcInstId(String procInstId) {
		ProcessRepeatCheckExample checkExample = new ProcessRepeatCheckExample();
		Criteria criteria = checkExample.createCriteria();
		criteria.andProcInstIdEqualTo(procInstId);

		return checkMapper.deleteByExample(checkExample);
	}
}
