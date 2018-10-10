package com.ut.scf.core.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.ArrayUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import sun.misc.BASE64Decoder;

public class SignUtil {

	private static final String ENCODING = "UTF-8";
	private static final String SIGNATURE_ALGORITHM = "SHA256withRSA";
	public static final String pubKey="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDX3jjOAukxo8ZK1tet14C+3HxJ6o01F9jM0F+O58Z6Jbcmd1x10UcMQQpCU3ObWR2bdEFwmnBruavmTZRFfMvVbNsYvbysrIp3+uyiPf3d5MG6aihrHb4+TEAXr05bY7UbfHJtugolDUSbKBKspgwAmkSqJvGL602VThAbGnMkkQIDAQAB";
	public static final String BAOLIPUBKEY="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDF1k+NpwYtDcVTZjidoTiTiSnZJ25iMF8rXKuXYGBgL5OKRLrjgIZfA88Sp97aSlDl+1yx65HxVCSbE45/yVJ3EmY4TvfWcwEhg6TfIg073/918UsJBSWZQO3+invJzat+ghtLD2BCKTGvOusLIDa8699BxmULaTk9q67/BMEA6wIDAQAB";
	public static final String priKey="MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMXWT42nBi0NxVNmOJ2hOJOJKdknbmIwXytcq5dgYGAvk4pEuuOAhl8DzxKn3tpKUOX7XLHrkfFUJJsTjn/JUncSZjhO99ZzASGDpN8iDTvf/3XxSwkFJZlA7f6Ke8nNq36CG0sPYEIpMa866wsgNrzr30HGZQtpOT2rrv8EwQDrAgMBAAECgYB0EPyRPWlZK1gWSsVybTCVFgawOPsAriJXfUHKSKeiJqdnmlUOvcuXmNN2vXf4F1uI4cSLOYpgzB3BwWJ7w/AVk+a47SsgSWAhqEzYW44WMwGlS6+f1r6OG+Hj1Ms2QbYOYXHrJgvma0xsDu90Gw9xpLAlkvhEcjDe+0a39GEEIQJBAPqL0G/qkaV7Et0qiMIwagfJDZukYLd+AHNLXVqV3CZedUDu50mJ4oYQ2WwKaMG36FBVeMLAClZuXp/IkVxGpnsCQQDKJMWh47f/yI1aN/AP9imPBuZFi6DghJo+w6Y/2dEY3gRncwCZfmBIIB0dX7fud9JIchZIElXSfFmurloJLLxRAkEA+BCmd6jQO//3VXNfpKU61iqChq/h8suWtpDQBXiLWJH9liT0ayNSXVshao+D2Qm1wpRd1LU/hwQQPDPheHObMQJBAKy8nZHIqVxPQdM9h8vr+/l32ODG/5O8XJ6TzAY2GMNaPYM1N+byok4f+yE1wVRrWeuEalvuJx52GqD15oR+kPECQD+1YhoavGNY9F7HvEqGlWeMWWYrXEnxcG83Ww9k01L6YpgcEOAoNR+4IwJArFzyVa6TjOH1TCE4CH+SRmTj6ZQ=";
	public static final String KEY_ALGORITHM = "RSA";
/*	测试环境
 * public static final String batchUrl ="http://api.test.fenqichaoren.com/yueda/index/bidding";
	public static final String orderUrl ="http://api.test.fenqichaoren.com/yueda/index/order_list";

	
	public static final String earlyRepaymentUrl="http://api.test.fenqichaoren.com/yueda/index/early_repayment_list";
	public static final String unsubscribeUrl="http://api.test.fenqichaoren.com/yueda/index/unsubscribe_list";
	public static final String repaymentPlan ="http://api.test.fenqichaoren.com/yueda/index/repayment_plan";
	public static final String orderConfirm ="http://api.test.fenqichaoren.com/yueda/index/confirm";*/
/*	public static final String loanNotify ="http://api.test.fenqichaoren.com/yueda/index/loan_notify";
	public static final String contract ="http://api.test.fenqichaoren.com/yueda/index/contract";*/
/*	public static final String userReplaymant ="http://api.test.fenqichaoren.com/yueda/index/user_repayment"*/
	/*
		public static final String userkhReplaymant ="http://api.test.fenqichaoren.com/yueda/index/user_repayment_plan";*/
	//准生产环境
	public static final String batchUrl ="http://api.beta.fenqichaoren.com/yueda/index/bidding";
	public static final String orderUrl ="http://api.beta.fenqichaoren.com/yueda/index/order_list";

	
	public static final String earlyRepaymentUrl="http://api.beta.fenqichaoren.com/yueda/index/early_repayment_list";
	public static final String unsubscribeUrl="http://api.beta.fenqichaoren.com/yueda/index/unsubscribe_list";
	public static final String cancelListUrl="http://api.beta.fenqichaoren.com/yueda/index/cancel_list";
	public static final String repaymentPlan ="http://api.beta.fenqichaoren.com/yueda/index/repayment_plan";
	public static final String orderConfirm ="http://api.beta.fenqichaoren.com/yueda/index/confirm";
	public static final String loanNotify ="http://api.beta.fenqichaoren.com/yueda/index/loan_notify";
	public static final String contract ="http://api.beta.fenqichaoren.com/yueda/index/contract";
	public static final String userReplaymant ="http://api.beta.fenqichaoren.com/yueda/index/user_repayment";
	public static final String userReplaymantCount ="http://api.beta.fenqichaoren.com/yueda/index/user_repayment_count";
	public static final String repaymentUserPlan ="http://api.beta.fenqichaoren.com/yueda/index/user_repayment_plan";
	
	/**
	 * SHA256WithRSA签名
	 * 
	 * @param data
	 * @param privateKey
	 * @return
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeySpecException
	 * @throws InvalidKeyException
	 * @throws SignatureException
	 * @throws UnsupportedEncodingException
	 */
	public static byte[] sign256(String data, PrivateKey privateKey)
			throws NoSuchAlgorithmException, InvalidKeySpecException,
			InvalidKeyException, SignatureException,
			UnsupportedEncodingException {

		Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);

		signature.initSign(privateKey);

		signature.update(data.getBytes(ENCODING));

		return signature.sign();
	}

	public static boolean verify256(String data, byte[] sign,
			PublicKey publicKey) {
		if (data == null || sign == null || publicKey == null) {
			return false;
		}

		try {
			Signature signetcheck = Signature.getInstance(SIGNATURE_ALGORITHM);
			signetcheck.initVerify(publicKey);
			signetcheck.update(data.getBytes("UTF-8"));
			return signetcheck.verify(sign);
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 二进制数据编码为BASE64字符串
	 * 
	 * @param data
	 * @return
	 */
	public static String encodeBase64(byte[] bytes) {
		return new String(Base64.encodeBase64(bytes));
	}

	/**
	 * BASE64解码
	 * 
	 * @param bytes
	 * @return
	 */
	public static byte[] decodeBase64(byte[] bytes) {
		byte[] result = null;
		try {
			result = Base64.decodeBase64(bytes);
		} catch (Exception e) {
			return null;
		}
		return result;
	}

	/**
     * 还原公钥
     * 
     * @param keyBytes
     * @return
	 * @throws IOException 
     */
    public static PublicKey getPublicKey() throws IOException {
    	byte[] keyBytes = (new BASE64Decoder()).decodeBuffer(pubKey);
        X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(keyBytes);
        try {
            KeyFactory factory = KeyFactory.getInstance(KEY_ALGORITHM);
            PublicKey publicKey = factory.generatePublic(x509EncodedKeySpec);
            return publicKey;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public static PublicKey getBaoliPublicKey() throws IOException {
    	byte[] keyBytes = (new BASE64Decoder()).decodeBuffer(BAOLIPUBKEY);
        X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(keyBytes);
        try {
            KeyFactory factory = KeyFactory.getInstance(KEY_ALGORITHM);
            PublicKey publicKey = factory.generatePublic(x509EncodedKeySpec);
            return publicKey;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            e.printStackTrace();
        }
        return null;
    }
 
    /**
     * 还原私钥
     * 
     * @param keyBytes
     * @return
     * @throws IOException 
     */
    public static PrivateKey getPrivateKey() throws IOException {
    	byte[] keyBytes = (new BASE64Decoder()).decodeBuffer(priKey);
        PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(keyBytes);
        try {
            KeyFactory factory = KeyFactory.getInstance(KEY_ALGORITHM);
            PrivateKey privateKey = factory.generatePrivate(pkcs8EncodedKeySpec);
            return privateKey;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    /**
     * 加密
     * @param bt_plaintext
     * @param publicKey
     * @return
     * @throws Exception
     */
    public static byte[] encrypt(byte[] data_byte,PublicKey publicKey)throws Exception{
//  		PublicKey publicKey = getPublicKey(pubKey);
  		Cipher cipher = Cipher.getInstance("RSA");
  		cipher.init(Cipher.ENCRYPT_MODE, publicKey);
  		ByteArrayOutputStream out = new ByteArrayOutputStream();
        int inputLen = data_byte.length;
        int offSet = 0;
        byte[] cache;
        int i = 0;
        // 对数据分段解密
        while (inputLen - offSet > 0) {
            if (inputLen - offSet > 117) {
                cache = cipher.doFinal(data_byte, offSet, 117);
            } else {
                cache = cipher.doFinal(data_byte, offSet, inputLen - offSet);
            }
            out.write(cache, 0, cache.length);
            i++;
            offSet = i * 117;
        }
        byte[] data = out.toByteArray();
        out.close();
        return data;
  	}
  	
    /**
     * 解密
     * @param bt_encrypted
     * @param privateKey
     * @return
     * @throws Exception
     */
  	public static byte[] decrypt(byte[] bt_encrypted,PrivateKey privateKey)throws Exception{
//        PrivateKey privateKey = getPrivateKey(str_priK);
        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] bt_original = cipher.doFinal(bt_encrypted);
        return bt_original;
  	}
  	
  	/**
  	 * post 请求超人接口
  	 */
  	public static JSONObject requestInterface (Map<String, Object> map ,String url){
  		JSONObject object = new JSONObject() ;
  		try {
  			String data_json = JSON.toJSONString(map);
  			PrivateKey privateKey = getPrivateKey();
  			PublicKey publicKey = getPublicKey();
  			byte [] data_byte = encrypt(data_json.getBytes(), publicKey);
  			String data = Base64.encodeBase64String(data_byte);
  			String req_time = System.currentTimeMillis() / 1000 + "";
  			String parametosign = "data="+data+"&req_time="+req_time;
  			System.out.println(parametosign);
  			byte [] sign_byte = sign256(parametosign, privateKey);
  			String sign = Base64.encodeBase64String(sign_byte);
  			Map<String, Object> paramas = new HashMap<String, Object>();
  			paramas.put("req_time", req_time);
  			paramas.put("sign", sign);
  			paramas.put("data", data);
  			String string = HttpClientUtil.getInstance().doPost(url,paramas);
  			System.out.println(string);
  			object = JSON.parseObject(string);
		} catch (Exception e) {
			e.printStackTrace();
		}
  		return object ;
  	}
  	
  	public static String parseData(String data) throws Exception{
  		PrivateKey privateKey = getPrivateKey();
  		String dataString = "";
  		if(data!=null || data != ""){
  			// 解密时超过128字节就报错。为此采用分段解密的办法来解密  
  			StringBuilder sb = new StringBuilder();  
  			byte [] byteData = Base64.decodeBase64(data);
  			for (int i = 0; i < byteData.length; i += 128) { 
  				byte [] databyte = decrypt(ArrayUtils.subarray(byteData, i, i + 128), privateKey);
//  			    byte[] doFinal = cipher.doFinal(ArrayUtils.subarray(data, i, i + 128));  
  			    sb.append(new String(databyte));  
  			}  

			
			dataString = sb.toString();
		}
  		return dataString;
  	}
//
	public static void main(String[] args) throws Exception {
		String date = "2018-06-19";
		String dataStr = "RgGlK7HtUNM5NopyQLX6DpNEEycVwBDfvyCVtmHR%2B0uMK0QbHnVDNVokHRdiOqnFKBhQT1SvIGEeRDoZaLKISm6cqnwJFkTV93KXDS35htM9f9PNR0TUxtQmR4foo%2FMsXDFsTpHzOj4LhdPi5KMvmDTw%2FhueiK6GyDucotzrRiF%2Bseardiun3reCnvVUpAli48JPiUM4He%2Fv%2BNkMSm2BQMb8wwZmW9c91TPBmt9%2BFmSSd64ruluJQT48k1mdO6auGYqA80SQ%2BUd0GWC83MY8mL179jRAaGtPRUnwVydGa33u%2Bj7z2L9RQlp0srDJFNUpqHObdqrCAxnpE82LNEdFdQA6F49gn6XpQnwTc4xLqujyzrGkGTZBSiFWo6%2Bd5RFoDZR%2FYReVCVjF2tWyv6iqQEhsKOTKAha77tS3LdMf6ldNJd6sLFdAGPW9JPN%2FPYjcYGm3p7tjBV22vs%2B%2BmjQXJ3YvCkpFSNZYmjRq261DI0hkEiQFt0IfgyXiLzCjWnDFdPByRHkYqAKDSoC8lOO6lwIrlZrQ9pCUQ2nLBYwHvInYR%2FQiefH6T3jhsM6cw972%2F1dDgKKp0SfbrxK4Bblbjf%2BW2b3TEomKHnGjOn3h6Hi%2Fzaqq8vM5SiV29xup6fhlGxzbYymkim%2FhY5biVuVXAitiVjB61vCdeyTkSaLZeL1D7TSbroejNSoZf3OQeTKOwFJTzEtSIXWdSbburYphEoqqieeTZUIpMAhWjAt0zGBCfAslb3kpI0%2FSgh2c4wiECPdcgeQx%2BaSa4AYx0me9NHcrwNrwvI7GRgvTIy0S2U5k8jT9bcTlWThOMY1Xth6kSytLNEv9SsVA6sMNuaVMk8sXQ0lq8n56Gc4fHEq4EPX%2FkY4RgHvO1sqolqFatyNU3PZJYHwkIU1nZj%2FhCJmJFXvImbZ8EOhK61FBRihN%2BLkkZGrKjV88T%2FM4BKUIxTmR3BnOyMFTdI5nGP9yB4GH3xzr9Hm0gWlluQdARXNL29yeZQJGl32514ig2SOr7jm%2Be10TIjj4QlL248WklyZu8gQZF6zt2WpCyktnMnkxUGw5hqiTYf5aKjpKaCtqOOzMrfdRrEFi1J7NKNGj9Rn1Y9fmYO%2BHlF%2F1W8Egsek%2Fip6y%2FWMzLEv1GiHvdPjgEavcZnMT5VzsdVyhlwpwPwVoehHv4fpngRoZDNOEcsOAlDs6PNp8K7Nooy2bI5J%2FDhnD7Zx%2FR7M3ekbCi%2F%2BPOfHnmHLksLLhjjBlfllzZc5d7NB%2BjtFgT0qvGWhkUhNCm7G99W5a%2FvVNCq4bVC3sOnFodljwy0oCASV8y6Z%2FBTOkA4B8YLBPUXUUeY9z3qM8TyDH50vS3o9Cgew6MA%2F85TkY5BH5b70%2BRhvJy1z9kKUHbhXKkzPlcf5DQcPcPAj298FjiLDBZjOW58TVHgNnKO4UOLq4y39UTbJ0pbw12vjL3zUGdC9VLPwXC7%2FbR8gnVPu0zRrRU9BDUGRguBrmHhB6sOmRv8NGLELnOgUvqNW7UwV2EaHwUtRqaAoIWTfeRCCJ";
//		String batchId = "321";
//		int page =0;
//		int pagNum =100;
//		boolean isTrue = true;
//		while(isTrue){
//			int pageStrat = page*pagNum;
//			Map<String, Object> map = new HashMap<String, Object>();
//			map.put("batch_id", batchId);
//			map.put("page", pageStrat);
//			map.put("page_num", pagNum);
//			JSONObject object = requestInterface(map, orderUrl);
//			if(object.getString("code").equals("200")){
//				//成功
//				String data1 =object.getString("data");
//				String dataString = parseData(data1);
//				System.out.println(dataString);
//				JSONArray dataArray = JSON.parseArray(dataString);
//				System.out.println(dataArray);
//				if(dataArray.size()<pagNum){
//					isTrue =false;
//				}else{
//					page++;
//				}
//				
//			}else{
//				//失败
//				System.out.println(object.getString("errMsg"));
//			}
//		}
//		
		String dataString = parseData(dataStr);
		System.out.println(dataString);
	}

}
