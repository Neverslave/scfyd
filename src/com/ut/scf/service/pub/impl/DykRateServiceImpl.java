package com.ut.scf.service.pub.impl;

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
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.DykRateMapper;
import com.ut.scf.dao.auto.FinanceInfoMapper;
import com.ut.scf.dao.pub.IDykRateDao;
import com.ut.scf.pojo.auto.DykRate;
import com.ut.scf.pojo.auto.DykRateExample;
import com.ut.scf.pojo.auto.FinanceInfo;
import com.ut.scf.pojo.auto.FinanceInfoExample;
import com.ut.scf.pojo.auto.FinanceInfoExample.Criteria;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.pub.IDykRateService;

@Service("dykRateService")
public class DykRateServiceImpl implements IDykRateService {

	private static final Logger log = LoggerFactory
			.getLogger(DykRateServiceImpl.class);

	@Resource
	private IDykRateDao dykRateDao;

	@Resource
	private DykRateMapper dykRateMapper;

	@Resource
	private FinanceInfoMapper financeInfoMapper;

	// 验证产品是否进行过融资
	private boolean checkProduct(String productId) {
		FinanceInfoExample example = new FinanceInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andProductIdEqualTo(productId);
		List<FinanceInfo> financeInfos = financeInfoMapper
				.selectByExample(example);

		if (financeInfos != null && financeInfos.size() > 0) {
			return false;
		}
		return true;
	}

	// 验证天数是否重复
	private boolean checkEndDay(String productId, int days, String id) {
		DykRateExample example = new DykRateExample();
		com.ut.scf.pojo.auto.DykRateExample.Criteria criteria = example
				.createCriteria();
		criteria.andProductIdEqualTo(productId);
		criteria.andDaysEndEqualTo(days);
		if (!"".equals(id)) {
			criteria.andRecUidNotEqualTo(id);
		}
		List<DykRate> dykRates = dykRateMapper.selectByExample(example);

		if (dykRates != null && dykRates.size() > 0) {
			return false;
		}
		return true;
	}

	/**
	 * 条件查询 分页获取
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getDykRateList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = dykRateDao.getDykRateList(paramMap,
				page);
		PageRespBean respBean = new PageRespBean();
		log.debug("DykRate list : {}", list);
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	/**
	 * 修改
	 * 
	 * @param DykRate
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateDykRate(DykRate dykRate) {
		BaseRespBean respBean = new BaseRespBean();

		if (!checkProduct(dykRate.getProductId())) {
			respBean.setResult(ErrorCodeEnum.RATE_MODE_FAIL);
			return respBean;
		}
		if (!checkEndDay(dykRate.getProductId(), dykRate.getDaysEnd(),
				dykRate.getRecUid())) {
			respBean.setResult(ErrorCodeEnum.RATE_END_DAYS_FAIL);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(dykRate);
		DykRate record = new DykRate();
		BeanUtil.mapToBean(paramMap, record);
		int updateNum = dykRateMapper.updateByPrimaryKeySelective(record);
		updateStandard(record.getProductId());
		log.debug("update im num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	/**
	 * 添加
	 * 
	 * @param DykRate
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addDykRate(DykRate dykRate) {
		BaseRespBean respBean = new BaseRespBean();
		if (!checkProduct(dykRate.getProductId())) {
			respBean.setResult(ErrorCodeEnum.RATE_ADD_FAIL);
			return respBean;
		}
		if (!checkEndDay(dykRate.getProductId(), dykRate.getDaysEnd(), "")) {
			respBean.setResult(ErrorCodeEnum.RATE_END_DAYS_FAIL);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(dykRate);
		DykRate record = new DykRate();
		BeanUtil.mapToBean(paramMap, record);
		record.setRecUid(ScfUUID.generate());
		int num = dykRateMapper.insertSelective(record);
		updateStandard(record.getProductId());
		if (num <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	// 删除
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteDykRate(DykRate dykRate) {
		BaseRespBean respBean = new BaseRespBean();
		if (!checkProduct(dykRate.getProductId())) {
			respBean.setResult(ErrorCodeEnum.RATE_DELETE_FAIL);
			return respBean;
		}
		Map<String, Object> paramMap = BeanUtil.beanToMap(dykRate);
		DykRate record = new DykRate();
		BeanUtil.mapToBean(paramMap, record);
		int num = dykRateMapper.deleteByPrimaryKey(dykRate.getRecUid());
		updateStandard(record.getProductId());
		if (num <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	// 组织利率标准
	private void updateStandard(String productId) {
		DykRateExample dykRateExample = new DykRateExample();
		dykRateExample.setOrderByClause("days_end ASC");
		com.ut.scf.pojo.auto.DykRateExample.Criteria criteria = dykRateExample
				.createCriteria();
		criteria.andProductIdEqualTo(productId);
		List<DykRate> dykRates = dykRateMapper.selectByExample(dykRateExample);
		if (dykRates == null) {
			return;
		}
		for (int i = 0; i < dykRates.size(); i++) {
			String stad = "";
			DykRate dykRate = dykRates.get(i);
			if (i == 0) {
				stad = "自付款承诺函到期日" + dykRate.getDaysEnd() + "天内";
			} else {
				DykRate dykRate1 = dykRates.get(i - 1);
				stad = "自付款承诺函到期日第" + (dykRate1.getDaysEnd() + 1) + "天至"
						+ dykRate.getDaysEnd() + "天";
			}
			dykRate.setRateStandard(stad);
			dykRateMapper.updateByPrimaryKeySelective(dykRate);
		}
	}
}
