package com.ut.scf.service.sys.impl;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ScfDateUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.BatchHndlInfoMapper;
import com.ut.scf.dao.auto.OrderBatchInfoMapper;
import com.ut.scf.dao.auto.OrderInfoMapper;
import com.ut.scf.dao.sys.IBatchDao;
import com.ut.scf.pojo.auto.BatchHndlInfo;
import com.ut.scf.pojo.auto.BatchHndlInfoExample;
import com.ut.scf.pojo.auto.BatchHndlInfoExample.Criteria;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.pojo.auto.OrderInfo;
import com.ut.scf.reqbean.sys.BatchReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.IBatchService;

@Service("batchService")
public class BatchServiceImpl implements IBatchService {

	private static final Logger log = LoggerFactory
			.getLogger(BatchServiceImpl.class);
	@Resource
	private OrderBatchInfoMapper orderBatchInfoMapper;
	@Resource
	private OrderInfoMapper orderInfoMapper;
	@Resource
	private IBatchDao batchDao;
	@Resource
	private BatchHndlInfoMapper batchHndlInfoMapper;

	// 查询批处理列表
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean batchInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = batchDao.selectBatchList(paramMap,
				page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	// 插入批处理
	@Override
	public BaseRespBean insertBathInfo(BatchHndlInfo batchHndlInfo) {
		BaseRespBean respBean = new BaseRespBean();
		// 根据日期 bean名称 方法名称先删除 保证某次自动任务只有一条批处理信息
		BatchHndlInfoExample example = new BatchHndlInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andExecuteTimeEqualTo(batchHndlInfo.getExecuteTime());
		criteria.andMethodNameEqualTo(batchHndlInfo.getMethodName());
		criteria.andClassNameEqualTo(batchHndlInfo.getClassName());
		batchHndlInfoMapper.deleteByExample(example);
		batchHndlInfo.setBatchId(ScfUUID.generate());
		// batchHndlInfo.setExecuteTime(new Date());
		int result = batchHndlInfoMapper.insert(batchHndlInfo);
		if (result > 0) {
			respBean.setResult(ErrorCodeEnum.SUCCESS);
		}
		return respBean;
	}

	// 执行批处理
	@Override
	public BaseRespBean doBatch(BatchReqBean batchReqBean) {
		BaseRespBean respBean = new BaseRespBean();
		try {
			WebApplicationContext wac = ContextLoader
					.getCurrentWebApplicationContext();
			Object obj = wac.getBean(batchReqBean.getClassName());
			Method m = null;

		
			if(batchReqBean.getMethodName().equals("orderInfoSyncBatch")||batchReqBean.getMethodName().equals("orderWingInfoSyncBatch")){
				m = obj.getClass().getDeclaredMethod(batchReqBean.getMethodName(),
						new Class[] { String.class });
				m.invoke(
						obj,
						new Object[] { ScfDateUtil.format(
								batchReqBean.getExecuteTime(), "yyyy-MM-dd") });
			}else if (batchReqBean.getMethodName().equals("orderInfoYiSyncTask")) {
		
				m = obj.getClass().getDeclaredMethod(batchReqBean.getMethodName(),
						new Class[] {});
				m.invoke(
						obj,
						new Object[] {});
			}else if (batchReqBean.getMethodName().equals("RepaymentPlanSyncBatch")||batchReqBean.getMethodName().equals("batchInfoSyncTask")) {
				OrderBatchInfo orderBatchInfo=orderBatchInfoMapper.selectByPrimaryKey(batchReqBean.getBatchId());
				if(orderBatchInfo==null){
					respBean.setResult(ErrorCodeEnum.BATCH_FAIL);
					respBean.setResultNote("不存在当前批次信息，请确认");
				
					
					return respBean;
				}
				m = obj.getClass().getDeclaredMethod(batchReqBean.getMethodName(),
						new Class[] { String.class, byte.class });
				m.invoke(
						obj,
						new Object[] { batchReqBean.getBatchId(), (byte)(Integer.valueOf(orderBatchInfo.getPeopleType()).intValue() )});
			}else if (batchReqBean.getMethodName().equals("RepaymentPlanSyncOrderId")) {
				
				OrderInfo orderInfo =orderInfoMapper.selectByPrimaryKey(batchReqBean.getOrderId());
				if(orderInfo==null){
					respBean.setResult(ErrorCodeEnum.BATCH_FAIL);
					respBean.setResultNote("不存在当前订单信息，请确认");
					return respBean;
				}
				m = obj.getClass().getDeclaredMethod(batchReqBean.getMethodName(),
						new Class[] { String.class, String.class,byte.class });
				m.invoke(
						obj,
						new Object[] { batchReqBean.getOrderId(),orderInfo.getBatchId(),(byte)(Integer.valueOf(orderInfo.getPeopleType()).intValue())});
			}else {
				m = obj.getClass().getDeclaredMethod(batchReqBean.getMethodName(),
						new Class[] { String.class });
				m.invoke(
						obj,
						new Object[] { ScfDateUtil.format(
								batchReqBean.getExecuteTime(), "yyyy-MM-dd") });
			}
	

			respBean.setResult(ErrorCodeEnum.SUCCESS);
			// updateBatchHndl(batchReqBean, "1");
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
			respBean.setResult(ErrorCodeEnum.BATCH_FAIL);
			// updateBatchHndl(batchReqBean, "0");
		}

		return respBean;
	}

	// private int updateBatchHndl(BatchReqBean batchReqBean, String result) {
	// BatchHndlInfo batchHndlInfo = new BatchHndlInfo();
	// batchHndlInfo.setResult(result);
	// batchHndlInfo.setBatchId(batchReqBean.getBatchId());
	// batchHndlInfoMapper.updateByPrimaryKeySelective(batchHndlInfo);
	// return 0;
	// }
}
