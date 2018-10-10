package com.ut.scf.core.dict;

import java.util.Arrays;
import java.util.List;

/**
 * scf业务公共常量
 * 
 * @author sll
 */
public interface ScfBizConsts
{
    
    /**
     * 删除状态
     */
    public final static int STATUS_DELETE = 0;
    
    /**
     * 正常状态
     */
    public final static int STATUS_NORMAL = 1;
    
    /**
     * 平台角色类型
     */
    public final static int ROLE_TYPE_PLAT = 1;
    
    /**
     * 保理商角色类型
     */
    public final static int ROLE_TYPE_FACTOR = 2;
    
    /**
     * 系统管理员角色Id
     */
    public final static String ROLE_ID_ROOT = "ROLE000001";
    
    /**
     * 保理商管理员角色Id
     */
    public final static String ROLE_ID_FACTOR_ADMIN = "ROLE000002";
    
    /**
     * 经销商
     */
    public final static String ROLE_ID_AGENCY = "ROLE000020";
    
    /**
     * 分期超人
     */
    public final static String ROLE_ID_SSM = "ROLE000021";
    
    /**
     * DYK
     */
    public final static List<String> ROLE_ID_DYK = Arrays.asList(
			"ROLE000017", "ROLE000018", "ROLE000019");
    
    /**
     * DYK公司企业
     */
    public final static String CORP_ID_DYK = "corp00002";
}
