package com.ut.scf.core.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;

/**
 * 发送http请求
 * 
 * @author liwd
 *
 */
public class HttpConnection {

	public static String sendGet(Map<String, String> paramMap, String paramUrl) {

		try {
			URL url = null;
			HttpURLConnection connection = null;
			BufferedReader bufferedReader = null; // 接受连接受的参数
			StringBuffer result = new StringBuffer(); // 用来接受返回值
			String parm = "";
			Iterator<String> iterator = paramMap.keySet().iterator();
			while (iterator.hasNext()) {
				String it = iterator.next();
				parm += it + "=" + URLEncoder.encode(paramMap.get(it), "utf-8")
						+ "&";
			}
			parm = parm.substring(0, parm.length() - 1);
			paramUrl += "?" + parm;
			// 创建URL
			url = new URL(paramUrl);
			// 建立连接
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestProperty("accept", "text/json");
			connection.setRequestProperty("connection", "keep-alive");
			connection
					.setRequestProperty("user-agent",
							"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0");
			connection.connect();

			// 接受连接返回参数
			bufferedReader = new BufferedReader(new InputStreamReader(
					connection.getInputStream()));
			String line;
			while ((line = bufferedReader.readLine()) != null) {
				result.append(line);
			}
			bufferedReader.close();
			return result.toString();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 向指定 URL 发送POST方法的请求
	 * 
	 * @param url
	 *            发送请求的 URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return 所代表远程资源的响应结果
	 */
	public static String sendPost(String url, Map<String, String> paramMap) {
		PrintWriter out = null;
		BufferedReader in = null;
		String result = "";
		String param = "";

		try {
			Iterator<String> iterator = paramMap.keySet().iterator();
			while (iterator.hasNext()) {
				String it = iterator.next();
				param += URLEncoder.encode(paramMap.get(it), "utf-8") + "&";
			}

			URL realUrl = new URL(url);
			// 打开和URL之间的连接
			URLConnection conn = realUrl.openConnection();
			// 设置通用的请求属性
			conn.setRequestProperty("accept", "*/*");
			conn.setRequestProperty("connection", "Keep-Alive");
			conn.setRequestProperty("user-agent",
					"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			// 发送POST请求必须设置如下两行
			conn.setDoOutput(true);
			conn.setDoInput(true);
			// 获取URLConnection对象对应的输出流
			out = new PrintWriter(conn.getOutputStream());
			// 发送请求参数
			out.print(param);
			// flush输出流的缓冲
			out.flush();
			// 定义BufferedReader输入流来读取URL的响应
			in = new BufferedReader(
					new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("发送 POST 请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输出流、输入流
		finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}

}
