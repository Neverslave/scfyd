package com.ut.scf.service.office.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.InternalInformMapper;
import com.ut.scf.dao.auto.SysUserMapper;
import com.ut.scf.dao.office.IinternalInformDao;
import com.ut.scf.dao.office.InfromUserDao;
import com.ut.scf.dao.pub.IUploadFileRelaDao;
import com.ut.scf.pojo.auto.InternalInform;
import com.ut.scf.reqbean.office.InternalInformAddReqBean;
import com.ut.scf.reqbean.office.InternalInformUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.ListRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.office.IinternalInformService;

/**
 * 部门相关service类
 * 
 * @author changxin
 *
 */

@Service("InternalInformService")
public class InternalInformServiceImpl implements IinternalInformService {
	private static final Logger log = LoggerFactory
			.getLogger(InternalInformServiceImpl.class);
	
	@Resource
	private IinternalInformDao InternalInformDao;
	
	@Resource
	private InternalInformMapper InternalInformMapper;
	
	@Resource
	private IUploadFileRelaDao uploadFileRelaDao; 
	
	@Resource
	private InfromUserDao infromUserDao;
	
	@Resource
	private SysUserMapper sysUserMapper;
		
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getInternalInformList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = InternalInformDao.selectInternalInformList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		
		respBean.setRecords(page.getTotalRecord());
		
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addInternalInform(InternalInformAddReqBean internalInform) {
		BaseRespBean respBean = new BaseRespBean();
		
		String recUid = ScfUUID.generate();
		internalInform.setRecUid(recUid);
		internalInform.setCreateTime(new Date());
		
		// 生成主键Id
		InternalInform inform = new InternalInform();
		BeanUtil.BeanToBean(inform, internalInform);
		int insertNum = InternalInformMapper.insert(inform);

		log.debug("insert inform num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		
		//添加到用户推送表
		@SuppressWarnings("unchecked")
		List<Map<String,Object>> userInfoList = (List<Map<String, Object>>) internalInform.getUserInfoList();
		if(userInfoList.size()>0){
			for(Map<String,Object> map:userInfoList){
				map.put("recUid", ScfUUID.generate());
				map.put("informId", inform.getRecUid());
				infromUserDao.insertUserInfo(map);
			}
		}
		
		//添加到upload_file_rela表中
		@SuppressWarnings("unchecked")
		List<Map<String,Object>> attachInfoList = (List<Map<String, Object>>) internalInform.getAttachInfoList();
		if(attachInfoList.size()>0){
			for(Map<String,Object> attachMap:attachInfoList){
				attachMap.put("fileId", ScfUUID.generate());
				attachMap.put("informId", inform.getRecUid());
				uploadFileRelaDao.insertInformFile(attachMap);
			}
		}

		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateInternalInform(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		InternalInform record = new InternalInform();
		BeanUtil.mapToBean(paramMap, record);
	
        int updateNum = InternalInformMapper.updateByPrimaryKeySelective(record);
		log.debug("update InternalInform num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@SuppressWarnings("unchecked")
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public BaseRespBean updateInternalformInfo(InternalInformUpdateReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		
//	1.修改internal_inform的信息
	InternalInform internalInformAuto = new InternalInform();
	BeanUtil.BeanToBean(internalInformAuto, reqBean);
	int updateNum =  InternalInformMapper.updateByPrimaryKeySelective(internalInformAuto);
	log.debug("updateMenuNum : {}", updateNum);
	if (updateNum <= 0) {
		throw new BizException(ErrorCodeEnum.UPDATE_FAILED);
	}

 //	2.修改用户推送表
//	1)先删除
	Map<String,Object> paramMap = new HashMap<String,Object>();
	if(!reqBean.getRecUid().equals(null)||!reqBean.getRecUid().equals("")){
		paramMap.put("informId", reqBean.getRecUid());
		infromUserDao.deleteUserInfo(paramMap);
	}
//	2)后添加
	List<Map<String,Object>> userInfoList = (List<Map<String, Object>>) reqBean.getUserInfoList();
	if(userInfoList.size()>0){
		for(Map<String,Object> map:userInfoList){
			map.put("recUid", ScfUUID.generate());
			map.put("informId", reqBean.getRecUid());
			infromUserDao.insertUserInfo(map);
		}
	}
//  3.修改upload_file_rela表
//	1)先删除
   if(!reqBean.getRecUid().equals(null)||!reqBean.getRecUid().equals("")){
		uploadFileRelaDao.deleteInformFile(reqBean.getRecUid());
	}

//	2)后添加

	List<Map<String,Object>> attachInfoList = (List<Map<String, Object>>) reqBean.getAttachInfoList();
	if(attachInfoList.size()>0){
		for(Map<String,Object> attachMap:attachInfoList){
			attachMap.put("fileId", ScfUUID.generate());
			attachMap.put("informId", reqBean.getRecUid());
            uploadFileRelaDao.insertInformFile(attachMap);
		}
	}

	return respBean;
}

    @Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteInternalInform(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("recUid", recUid);
		
/*		InternalInform record = new InternalInform();
		BeanUtil.mapToBean(paramMap, recUid);*/
		
		int deleteNum = InternalInformMapper.deleteByPrimaryKey(recUid);
		log.debug("delete InternalInform num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getInternalInform(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> resultList = InternalInformDao.selectInternalInform(paramMap,page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		
		respBean.setRecords(page.getTotalRecord());
		
		respBean.setDataList(resultList);
		return respBean;
	}

	@Override
	public BaseRespBean countInternalInform(Map<String, Object> paramMap) {
		ListRespBean listRespBean = new ListRespBean();
		int countInternalInform = InternalInformDao.countInternalInform(paramMap);
		List<Map<String,Object>> dataList = new ArrayList<>();
		Map<String,Object> countMap = new HashMap<>();
		countMap.put("internalInformNum", countInternalInform);
		dataList.add(countMap);
		listRespBean.setDataList(dataList);
		return listRespBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteMyInform(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("recUid", recUid);
		
/*		InternalInform record = new InternalInform();
		BeanUtil.mapToBean(paramMap, recUid);*/
		
		int deleteNum = InternalInformDao.deleteMyinformByPrimaryKey(recUid);
		log.debug("delete InternalInform num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

}







