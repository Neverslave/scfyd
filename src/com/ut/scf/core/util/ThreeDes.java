package com.ut.scf.core.util;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.util.StringUtil;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import com.mysql.jdbc.StringUtils;
import com.ut.scf.dao.auto.OrderInfoYiMapper;
import com.ut.scf.pojo.auto.OrderInfoYi;


public class ThreeDes {


    /**
     *
     * @param key     加密的密码
     * @param zipOutPath  压缩文件输出的路径
     * @param zipFilePath  要压缩的文件
     * @throws Exception
     */
    public static void encryptZip(String key, String zipOutPath, String zipFilePath) throws Exception {


    	StringBuffer textstring=null;
        OutputStream zipOutputPathStream = new FileOutputStream(new File(zipOutPath));
        SecretKey secretKeySpec = new SecretKeySpec(key.getBytes(), "DESede");
        Cipher instance = Cipher.getInstance("DESede");
        instance.init(Cipher.ENCRYPT_MODE, secretKeySpec);

        OutputStream cipherOutputStream = new CipherOutputStream(zipOutputPathStream, instance);
        ZipOutputStream zipOutputStream = new ZipOutputStream(cipherOutputStream);
        zipOutputStream.putNextEntry(new ZipEntry(zipFilePath));

        InputStream fileInputStream = new FileInputStream(new File(zipFilePath));

        BufferedInputStream bis = new BufferedInputStream(fileInputStream);
        BufferedOutputStream bos = new BufferedOutputStream(zipOutputStream);

        byte[] bytes = new byte[1024];
        int len = 0;
        textstring=new StringBuffer();
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len
            		
            );
           
        }
        bos.flush();

        bos.close();
        bis.close();
        fileInputStream.close();
        zipOutputStream.close();
        cipherOutputStream.close();
        zipOutputPathStream.close();
        
        SXSSFWorkbook wb = new SXSSFWorkbook(100); // 这里100是在内存中的数量，如果大于此数量时，会写到硬盘，以避免在内存导致内存溢出
		Sheet sh = wb.createSheet();
		Row firstRow = sh.createRow(0);

		firstRow.createCell(0).setCellValue("序号");
		firstRow.createCell(1).setCellValue("订单号");
		firstRow.createCell(2).setCellValue("翼支付订单号");
		firstRow.createCell(3).setCellValue("翼支付用户id");
		firstRow.createCell(4).setCellValue("分期超人用户id");
		firstRow.createCell(5).setCellValue("套餐ID");
		firstRow.createCell(6).setCellValue("套餐名称");
		firstRow.createCell(7).setCellValue("套餐价格(元)");
		firstRow.createCell(8).setCellValue("商品名称");
		firstRow.createCell(9).setCellValue("商品类型");
		firstRow.createCell(10).setCellValue("商品价格");
		firstRow.createCell(11).setCellValue("商品数量");
		firstRow.createCell(12).setCellValue("商品描述");
		firstRow.createCell(13).setCellValue("订单金额");
		firstRow.createCell(14).setCellValue("订单描述");
		firstRow.createCell(15).setCellValue("分期期数");
		firstRow.createCell(16).setCellValue("分期本金");
		firstRow.createCell(17).setCellValue("合约机号码");
		firstRow.createCell(18).setCellValue("IMEI");
		firstRow.createCell(19).setCellValue("运营商");
		firstRow.createCell(20).setCellValue("手机制造商");
		firstRow.createCell(21).setCellValue("手机型号");
		firstRow.createCell(22).setCellValue("操作系统类型");
		firstRow.createCell(23).setCellValue("浏览器类型");
		firstRow.createCell(24).setCellValue("浏览器版本");
		firstRow.createCell(25).setCellValue("安全评分");
		firstRow.createCell(26).setCellValue("网络类型");
		firstRow.createCell(27).setCellValue("内网IP");
		firstRow.createCell(28).setCellValue("营业员手机经度");
		firstRow.createCell(29).setCellValue("营业员手机纬度");
		firstRow.createCell(30).setCellValue("客户经理姓名");
		firstRow.createCell(31).setCellValue("客户经理手机号");
		firstRow.createCell(32).setCellValue("营业厅名称");
		firstRow.createCell(33).setCellValue("营业厅地址");
		firstRow.createCell(34).setCellValue("提货单照片");
		firstRow.createCell(35).setCellValue("合约协议PDF ID");
		firstRow.createCell(36).setCellValue("购买手机imei");
		firstRow.createCell(37).setCellValue("订单状态");


		/*CacheOrder cacheOrder = null;
		for (int i = 1; i <= list.size(); i++) {
			Row row = sh.createRow(i);
		
			row.createCell(0).setCellValue(cacheOrder.getOrderId());
			row.createCell(1).setCellValue(cacheOrder.getGoods_id());
			row.createCell(2).setCellValue(cacheOrder.getLoan().toString());
			row.createCell(3).setCellValue(cacheOrder.getName());
			row.createCell(4).setCellValue(cacheOrder.getIDcard());
			row.createCell(5).setCellValue(cacheOrder.getMobile());
			row.createCell(6).setCellValue(cacheOrder.getUnivs());
			row.createCell(7).setCellValue(cacheOrder.getUnivsRoom());
			row.createCell(8).setCellValue(cacheOrder.getFinishTime());
			row.createCell(9).setCellValue(cacheOrder.getQQ());
			row.createCell(10).setCellValue(cacheOrder.getWechat());
			row.createCell(11).setCellValue(cacheOrder.getFirstName());
			row.createCell(12).setCellValue(cacheOrder.getFirstMobile());
			row.createCell(13).setCellValue(cacheOrder.getSecondName());
			row.createCell(14).setCellValue(cacheOrder.getSecondMobile());
			row.createCell(15).setCellValue(cacheOrder.getThirdName());
			row.createCell(16).setCellValue(cacheOrder.getThirdMobile());
			row.createCell(17).setCellValue(cacheOrder.getGoodsName());
			row.createCell(18).setCellValue(String.valueOf(cacheOrder.getPeriod()));
			row.createCell(19).setCellValue(cacheOrder.getFirstPay().toString());
			row.createCell(20).setCellValue(cacheOrder.getPayM().toString());
			row.createCell(21).setCellValue(cacheOrder.getStartPayDay());
			row.createCell(22).setCellValue(cacheOrder.getFqcrM().toString());
			row.createCell(23).setCellValue(cacheOrder.getSellerID());
			row.createCell(24).setCellValue(cacheOrder.getSellerName());
			row.createCell(25).setCellValue(cacheOrder.getStartTime());
			row.createCell(26).setCellValue(cacheOrder.getPlus_189_Desc());
			row.createCell(27).setCellValue(cacheOrder.getPayTime());
			row.createCell(28).setCellValue(cacheOrder.getP2p_bidding_id());
			row.createCell(29).setCellValue(cacheOrder.getUser_pay_type_Des());
		}

		File file = new File(path);
		file.createNewFile();
		FileOutputStream out = new FileOutputStream(file);
		wb.write(out);
		out.close();*/
        
        

    }

    /**
     *
     * @param key  解密的密码
     * @param unZipPath   要解密的压缩文件路径
     * @param outFilePath 解密解压缩之后的文件路径
     * @throws Exception
     */
    public static List<OrderInfoYi> decryptZip(String key, String path, String fileurl) throws Exception{
    
        List<OrderInfoYi> orderInfoYis=new ArrayList<OrderInfoYi>();
    	String   unZipPath="";
    	String   outFilePath="";
    	StringBuffer textstring=null;
    	unZipPath= path + File.separatorChar + fileurl;  
    	outFilePath= path + File.separatorChar + fileurl.replaceAll(".zip", ".txt");  
    	
       	InputStream zipInputStream = new FileInputStream(new File(unZipPath));
        SecretKey secretKeySpec = new SecretKeySpec(key.getBytes(), "DESede");
        Cipher cipher = Cipher.getInstance("DESede");
        cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);

        CipherInputStream cipherInputStream = new CipherInputStream(zipInputStream, cipher);
        ZipInputStream decryptZipInputStream = new ZipInputStream(cipherInputStream);
        if (decryptZipInputStream.getNextEntry() == null) {
            return null;
        }
        FileOutputStream fileOutputStream = new FileOutputStream(new File(outFilePath));

        BufferedInputStream bis = new BufferedInputStream(decryptZipInputStream);
        BufferedOutputStream bos = new BufferedOutputStream(fileOutputStream);

        byte[] bytes = new byte[1024];
        int len = 0;
        textstring=new StringBuffer();
        while ((len = bis.read(bytes)) != -1) {
            bos.write(bytes, 0, len);
          
        }
    
        bos.flush();

        bos.close();
        bis.close();
        fileOutputStream.close();
        decryptZipInputStream.close();
        cipherInputStream.close();
        zipInputStream.close();
        
        
        
              BufferedReader br = null;  
               List<String> excellist=null; 
                try {
                	br = new BufferedReader(new InputStreamReader(new FileInputStream(outFilePath),"UTF-8")); //这里可以控制编码 
                	//br = new BufferedReader(new FileReader(outFilePath));//
                	excellist = new ArrayList<String>();  
                    String line = null;  
                    while((line = br.readLine()) != null) {  
                    	excellist.add(line);
                    }  
                } catch (Exception e) {  
                    e.printStackTrace();  
                } finally {  
                    try {  
                        br.close();  
                    } catch (Exception e) {  
                        e.printStackTrace();  
                    }     
                }  
    
               
                
                SXSSFWorkbook wb = new SXSSFWorkbook(100); // 这里100是在内存中的数量，如果大于此数量时，会写到硬盘，以避免在内存导致内存溢出
        		Sheet sh = wb.createSheet();
        		String orderDate="";
                for(int ii=0;ii<excellist.size();ii++)
                {
                	
                	
                	if(ii==0&&excellist.get(ii)!=null)
                	{
                		String[] exceldata=excellist.get(ii).split("\\|");
                		Row topRow = sh.createRow(0);
                		
                		topRow.createCell(0).setCellValue("日期");
                		topRow.createCell(1).setCellValue(exceldata[0]);
                		orderDate=exceldata[0];
                		topRow.createCell(2).setCellValue("数量");
                		topRow.createCell(3).setCellValue(exceldata[1]);
                		topRow.createCell(4).setCellValue("总金额");
                		topRow.createCell(5).setCellValue(exceldata[2]);
                		
                		Row firstRow = sh.createRow(1);
                		firstRow.createCell(0).setCellValue("序号");
                		/*firstRow.createCell(1).setCellValue("订单号");*/
                		firstRow.createCell(1).setCellValue("翼支付订单号");
                		firstRow.createCell(2).setCellValue("翼支付用户id");
                	/*	firstRow.createCell(4).setCellValue("分期超人用户id");*/
                		firstRow.createCell(3).setCellValue("套餐ID");
                		firstRow.createCell(4).setCellValue("套餐名称");
                		firstRow.createCell(5).setCellValue("套餐价格(元)");
                		firstRow.createCell(6).setCellValue("商品名称");
                		firstRow.createCell(7).setCellValue("商品类型");
                		firstRow.createCell(8).setCellValue("商品价格");
                		firstRow.createCell(9).setCellValue("商品数量");
                		firstRow.createCell(10).setCellValue("商品描述");
                		firstRow.createCell(11).setCellValue("订单金额");
                		firstRow.createCell(12).setCellValue("订单描述");
                		firstRow.createCell(13).setCellValue("分期期数");
                		firstRow.createCell(14).setCellValue("分期本金");
                		firstRow.createCell(15).setCellValue("合约机号码");
                		firstRow.createCell(16).setCellValue("IMEI");
                		firstRow.createCell(17).setCellValue("运营商");
                		firstRow.createCell(18).setCellValue("手机制造商");
                		firstRow.createCell(19).setCellValue("手机型号");
                		firstRow.createCell(20).setCellValue("操作系统类型");
                		firstRow.createCell(21).setCellValue("浏览器类型");
                		firstRow.createCell(22).setCellValue("浏览器版本");
                		firstRow.createCell(23).setCellValue("安全评分");
                		firstRow.createCell(24).setCellValue("网络类型");
                		firstRow.createCell(25).setCellValue("内网IP");
                		firstRow.createCell(26).setCellValue("营业员手机经度");
                		firstRow.createCell(27).setCellValue("营业员手机纬度");
                		firstRow.createCell(28).setCellValue("客户经理姓名");
                		firstRow.createCell(29).setCellValue("客户经理手机号");
                		firstRow.createCell(30).setCellValue("营业厅名称");
                		firstRow.createCell(31).setCellValue("营业厅地址");
                		firstRow.createCell(32).setCellValue("提货单照片");
                		firstRow.createCell(33).setCellValue("合约协议PDF ID");
                		firstRow.createCell(34).setCellValue("购买手机imei");
                		firstRow.createCell(35).setCellValue("订单状态");
                	}
                	else
                	{
                 		String[] exceldata=excellist.get(ii).split("\\|");
                 		 OrderInfoYi orderInfoYi=new OrderInfoYi();
                 		orderInfoYi.setOrderDate(orderDate);
                		orderInfoYi.setOrderIdYi(exceldata[1]);
                		orderInfoYi.setYiUserId(exceldata[2]);
                		orderInfoYi.setPackageId(exceldata[3]);
                		orderInfoYi.setPackageName(exceldata[4]);
					orderInfoYi.setPackagePrice(StringUtils.isEmptyOrWhitespaceOnly(exceldata[5])
							? new BigDecimal("0.00") : ((new BigDecimal(exceldata[5])).divide(new BigDecimal(100))));
                		orderInfoYi.setGoodsName(exceldata[6]);
                		orderInfoYi.setGoodsType(exceldata[7]);
                		orderInfoYi.setGoodsPrice(StringUtils.isEmptyOrWhitespaceOnly(exceldata[8])
    							? new BigDecimal("0.00") : ((new BigDecimal(exceldata[8])).divide(new BigDecimal(100))));
                		orderInfoYi.setGoodsNum(StringUtils.isEmptyOrWhitespaceOnly(exceldata[9])
    							? 0 : Integer.valueOf(exceldata[9]));                		
                		orderInfoYi.setGoodsDescribe(exceldata[10]);
                		orderInfoYi.setOrderPrice(StringUtils.isEmptyOrWhitespaceOnly(exceldata[11])
    							? new BigDecimal("0.00") : ((new BigDecimal(exceldata[11])).divide(new BigDecimal(100))));
                		orderInfoYi.setOrderDescribe(exceldata[12]);
                		orderInfoYi.setFinancePeriod(StringUtils.isEmptyOrWhitespaceOnly(exceldata[13])
    							? 0 : Integer.valueOf(exceldata[13]));
                		orderInfoYi.setFinanceAmt(StringUtils.isEmptyOrWhitespaceOnly(exceldata[14])
    							? new BigDecimal("0.00") : ((new BigDecimal(exceldata[14])).divide(new BigDecimal(100))));
                		orderInfoYi.setMobileNum(exceldata[15]);
                		orderInfoYi.setImei(exceldata[16]);
                		orderInfoYi.setOperator(exceldata[17]);
                		orderInfoYi.setMobileMaker(exceldata[18]);
                		orderInfoYi.setMobileType(exceldata[19]);
                		orderInfoYi.setOperatingSystem(exceldata[20]);
                		orderInfoYi.setBrowserType(exceldata[21]);
                		orderInfoYi.setBrowserVersion(exceldata[22]);
                		orderInfoYi.setSafeMark(exceldata[23]);
                		orderInfoYi.setNetworkType(exceldata[24]);
                		orderInfoYi.setIntranetIp(exceldata[25]);
                		orderInfoYi.setSalespersonMobileLongitude(exceldata[26]);
                		orderInfoYi.setSalespersonMobileLatitude(exceldata[27]);
                		orderInfoYi.setCustomerManager(exceldata[28]);
                		orderInfoYi.setCustomerTell(exceldata[29]);
                		orderInfoYi.setBusinessAllName(exceldata[30]);
                		orderInfoYi.setBusinessAllAddress(exceldata[31]);
                		orderInfoYi.setBillPhotos(exceldata[32]);
                		orderInfoYi.setAgreementPdf(exceldata[33]); 
                		orderInfoYi.setMoblieImei(exceldata[34]);
                		orderInfoYi.setOrderStatus(exceldata[35]);
                		
                		orderInfoYis.add(orderInfoYi);
                		
                		
                		
                		
                		Row datarow = sh.createRow(ii+1);
                		for(int iii=0;iii<exceldata.length;iii++)
                		{
                			
                			datarow.createCell(iii).setCellValue(exceldata[iii]);
                		}
                		
                	}
                	
                }
          
                File file = new File(path + File.separatorChar + fileurl.replaceAll(".zip", ".xls"));
        		file.createNewFile();
        		FileOutputStream out = new FileOutputStream(file);
        		wb.write(out);
        		out.close();
        		
        	
       return orderInfoYis;

    }


/*    public static void main(String[] args) throws Exception {
        String key = "20171012CFQFQCRcr0U30vV1";
        String zipPath = "C:\\Users\\92947\\Desktop\\新建文件夹 (13)\\COMPLETED20171012CFQFQCR20180514.zip";
        String zipFile = "C:\\Users\\92947\\Desktop\\新建文件夹 (13)\\COMPLETED20171012CFQFQCR20180514.txt";

      // encryptZip(key, zipPath, zipFile);

        String unZipOutPath = "C:\\Users\\92947\\Desktop\\新建文件夹 (13)\\COMPLETED20171012CFQFQCR20180514.txt";

        decryptZip(key, zipPath, unZipOutPath);


        Double d = 1.20d;
        BigDecimal bigDecimal = new BigDecimal("1.00");
        BigDecimal decimal = new BigDecimal(String.valueOf(d));
        System.out.println(bigDecimal  +">>>>>>"+decimal);
        System.out.println(bigDecimal.equals(decimal)+">>");

    }*/


}