package com.ut.scf.web.interceptor;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.service.sys.IUserOperService;

public class WechatHandlerInterceptor extends HandlerInterceptorAdapter {

    @Resource
    private IUserOperService userOperService;

    private static final Logger log = LoggerFactory
            .getLogger(WechatHandlerInterceptor.class);
    
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        String openIdSession = (String) session.getAttribute("openId");
        if (StringUtils.isNotBlank(openIdSession)) {
            return true;
        }
        String openId = request.getParameter("openId");
        Map<String, Object> map = userOperService.userWeChat(openId);

        if (map == null) {
            response.sendRedirect("/login.html");
            return false;
        } else {
            session.setAttribute("openId",map.get("openId"));
            session.setAttribute("roleList", map.get("roleList"));
            session.setAttribute(ScfConsts.SESSION_USER_ID, map.get("userId"));
            session.setAttribute(ScfConsts.SESSION_USERNAME, map.get("username"));
            session.setAttribute(ScfConsts.SESSION_ROLE_ID, map.get("roleId"));
            session.setAttribute(ScfConsts.SESSION_ROLE_NAME, map.get("roleName"));
            session.setAttribute(ScfConsts.SESSION_ROLE_TYPE, map.get("roleType"));
            session.setAttribute(ScfConsts.SESSION_CORP_ID, map.get("corpId"));
            session.setAttribute(ScfConsts.SESSION_DEPT_ID, map.get("deptId"));
            session.setAttribute(ScfConsts.SESSION_REPRESENT_ID, map.get("representId"));
            return true;
        }

    }

    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }

}
