package com.ut.scf.core.util;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.scf.reqbean.tradfact.Agency;


/**
 * 发送http请求
 *
 * @author liwd
 */
public class HttpPostUtil {

    // 接口地址
    private static String URL = "";
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private HttpClient httpClient = null;
    private HttpPost method = null;

    public HttpPostUtil(String url) {
        if (url != null) {
            this.URL = url;
        }
        if (URL != null) {
            httpClient = new DefaultHttpClient();
            method = new HttpPost(URL);

        }
    }


    public String post(String parameters) {
        String body = null;
        parameters = parameters == null ? "" : parameters;
        logger.info("parameters:{}", parameters);
        if (method != null) {
            try {
                // 建立一个NameValuePair数组，用于存储欲传送的参数
                method.addHeader("Content-type", "application/json; charset=utf-8");
                method.setHeader("Accept", "application/json");
                method.setEntity(new StringEntity(parameters, Charset.forName("UTF-8")));
                HttpResponse response = httpClient.execute(method);
                int statusCode = response.getStatusLine().getStatusCode();
                logger.info("statusCode:{}", statusCode);
                body = EntityUtils.toString(response.getEntity());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return body;
    }

    public static void main(String[] args) {
    	Agency agency = new Agency();
    	agency.setProcdefName("代办名称");
    	agency.setToUser("oA8MnxLhhFbU6SF19uYfONkcRmwM");
    	agency.setUserName("季杭");
        HttpPostUtil connection = new HttpPostUtil("http://localhost:8080/scfyd-wx/wechat/template/send");
        String result = connection.post(new JSONObject(agency).toString());
        System.out.println(result);
    }
}
