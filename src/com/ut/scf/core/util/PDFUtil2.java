package com.ut.scf.core.util;

import java.io.File;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.utils.PdfMerger;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;

/**
 * pdf相关操作类，填pdf模板
 * 
 * @author liwd
 *
 */
public class PDFUtil2 {

	/**
	 * 填pdf 模板
	 * 
	 * @param templetPath
	 *            模板路径 包含文件名
	 * 
	 * @param toPath
	 *            输出的pdf文件 包含文件名
	 * 
	 * 
	 * 
	 * @param param
	 *            填入的key 和 value key表示pdf的文本域名 value表示要填入的值
	 *
	 *            融资承诺函：
	 * 
	 *            financeNo:编号 agencyName:经销商名称 money:融资金额 year：年 month：月 day：日
	 * 
	 *            付款承诺函：
	 * 
	 *            payNo：付款承诺函编号 agencyName：经销商名称 yearPay monthPay dayPay 付款年月日
	 *            money:付款金额 BLContractNo：保理合同编号 carFileNo：车辆信息文件编号 year month day
	 *            ：年月日
	 * 
	 *            订单合同： NO：编号 money1:融资金额 money2：保证金 date：日期
	 * @return
	 * @throws Exception
	 */
	// 根据模板传Pdf
	public static void exportToPDF(String templetPath, String toPath, Map<String, String> param) throws Exception {
		PdfReader reader = new PdfReader(templetPath); // 模版文件目录
		PdfDocument pdf = new PdfDocument(reader, new PdfWriter(toPath));
		PdfAcroForm form = PdfAcroForm.getAcroForm(pdf, true);
		form.setGenerateAppearance(true);
		for (String str : param.keySet()) {
			PdfFormField tf = form.getFormFields().get(str);
			if(param.get(str)==null)
			{
				tf.setFontSize(10).setValue("");
			}
			else
			{

				tf.setFontSize(10).setValue(param.get(str));
			}
		}
		form.flattenFields();
		pdf.close();
	}

	// 把表格写入现有的pdf
	public static Document writeTableToPDF(String toPath) throws Exception {
		PdfDocument pdfDocument = new PdfDocument(new PdfWriter(toPath));

		Document document = new Document(pdfDocument, PageSize.A3);
		return document;
	}

	// 合并PDf
	public static void mergePDF(String path1, String path2, String toPath) throws Exception {
		PdfDocument pdfDocument = new PdfDocument(new PdfWriter(toPath));
		PdfMerger pdfMerger = new PdfMerger(pdfDocument);
		PdfDocument readDoc1 = new PdfDocument(new PdfReader(path1));
		PdfDocument readDoc2 = new PdfDocument(new PdfReader(path2));
		pdfMerger.merge(readDoc1, 1, 1);
		pdfMerger.merge(readDoc2, 1, readDoc2.getNumberOfPages());
		readDoc2.close();
		readDoc1.close();
		pdfDocument.close();
	}

	// 创建表格
	public static Table getPdfPTable(float[] size) {
		// PdfFontFactory.registerSystemDirectories();// 加载系统字体
		Table table = new Table(size);
		return table;
	}

	public static Table getPdfPTable(UnitValue[] unitValue) {
		// PdfFontFactory.registerSystemDirectories();// 加载系统字体
		Table table = new Table(unitValue, true);
		return table;
	}

	// 表格设置标题
	public static void setTitleCell(Table table, int size, String title) throws Exception {
		PdfFont font = chineseFont();
		Cell cell = new Cell(1, size).setFont(font).add(new Paragraph(title));
		cell.setBorder(Border.NO_BORDER);
		// cell.setVerticalAlignment(VerticalAlignment.MIDDLE);
		cell.setTextAlignment(TextAlignment.CENTER);
		table.addHeaderCell(cell);
	}
	// 表格设置标题
	public static void setContractNoCell(Table table, int size, String text) throws Exception {
		PdfFont font = chineseFont();
		 Paragraph p =new Paragraph(text);
		 p.setFontSize(8);
		Cell cell = new Cell(1, size).setFont(font).add(p);
		cell.setBorder(Border.NO_BORDER);
		// cell.setVerticalAlignment(VerticalAlignment.MIDDLE);
		cell.setTextAlignment(TextAlignment.LEFT);
		table.addHeaderCell(cell);
	}

	// 设置列名
	public static void setFields(Table table, List<String> cellNames) throws Exception {
		PdfFont font = chineseFont();
		for (String cellName : cellNames) {
			 Paragraph p =new Paragraph(cellName);
			 p.setFontSize(8);
			 Cell cell =new Cell().setFont(font).add(p);
			 cell.setTextAlignment(TextAlignment.CENTER);
			table.addCell(cell);
		}
	}
	public static void setFooterFields(Table table, int countOrderId, BigDecimal totalPriceSum, BigDecimal needmoneySum,
			BigDecimal periodBlRepayAmtSum, BigDecimal currentMoneySum, BigDecimal interestSum) throws Exception {
			PdfFont font = chineseFont();	
			 Paragraph p =new Paragraph("合计");
			 p.setFontSize(8);
			 Cell cell =new Cell().setFont(font).add(p);
			 cell.setTextAlignment(TextAlignment.CENTER);
			table.addCell(cell);
			
			 Paragraph p1 =new Paragraph(String.valueOf(countOrderId)+"笔");
			 p1.setFontSize(8);
			 Cell cell1 =new Cell().setFont(font).add(p1);
			 cell1.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell1);
			 
			 Paragraph p2 =new Paragraph(String.valueOf(totalPriceSum));
			 p2.setFontSize(8);
			 Cell cell2 =new Cell().setFont(font).add(p2);
			 cell2.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell2);
			 
			 Paragraph p3 =new Paragraph(String.valueOf(needmoneySum));
			 p3.setFontSize(8);
			 Cell cell3 =new Cell().setFont(font).add(p3);
			 cell3.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell3);
			 
			 Paragraph p4 =new Paragraph(String.valueOf(periodBlRepayAmtSum));
			 p4.setFontSize(8);
			 Cell cell4 =new Cell().setFont(font).add(p4);
			 cell4.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell4);
			 
			 Paragraph p5 =new Paragraph("-");
			 p5.setFontSize(8);
			 Cell cell5 =new Cell().setFont(font).add(p5);
			 cell5.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell5);
			 
			 Paragraph p51 =new Paragraph("-");
			 p51.setFontSize(8);
			 Cell cell51 =new Cell().setFont(font).add(p51);
			 cell51.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell51);
			 
			 Paragraph p52 =new Paragraph("-");
			 p52.setFontSize(8);
			 Cell cell52 =new Cell().setFont(font).add(p52);
			 cell52.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell52);
			 
			 Paragraph p6 =new Paragraph(String.valueOf(currentMoneySum));
			 p6.setFontSize(8);
			 Cell cell6 =new Cell().setFont(font).add(p6);
			 cell6.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell6);
			 
			 Paragraph p7 =new Paragraph(String.valueOf(interestSum));
			 p7.setFontSize(8);
			 Cell cell7 =new Cell().setFont(font).add(p7);
			 cell7.setTextAlignment(TextAlignment.CENTER);
			 table.addCell(cell7);
		
		
	}
	
	public static void setFooterFields(Table table, int countOrderId, BigDecimal totalPriceSum,
			BigDecimal needmoneySum, BigDecimal sumMarketingFeeYiSum, BigDecimal periodBlRepayAmtSum,
			BigDecimal periodYhPayAmtSum, BigDecimal currentMoneySum, BigDecimal marketingFeeYiSum,
			BigDecimal interestSum, BigDecimal lcMoneySum, BigDecimal serviceChargeYiSum)throws Exception {
		PdfFont font = chineseFont();	
		 Paragraph p =new Paragraph("合计");
		 p.setFontSize(8);
		 Cell cell =new Cell().setFont(font).add(p);
		 cell.setTextAlignment(TextAlignment.CENTER);
		table.addCell(cell);
		
		 Paragraph p1 =new Paragraph(String.valueOf(countOrderId)+"笔");
		 p1.setFontSize(8);
		 Cell cell1 =new Cell().setFont(font).add(p1);
		 cell1.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell1);
		 
		 Paragraph p2 =new Paragraph(String.valueOf(totalPriceSum));
		 p2.setFontSize(8);
		 Cell cell2 =new Cell().setFont(font).add(p2);
		 cell2.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell2);
		 
		 Paragraph p3 =new Paragraph(String.valueOf(needmoneySum));
		 p3.setFontSize(8);
		 Cell cell3 =new Cell().setFont(font).add(p3);
		 cell3.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell3);
		 Paragraph p31 =new Paragraph(String.valueOf(sumMarketingFeeYiSum));
		 p31.setFontSize(8);
		 Cell cell31 =new Cell().setFont(font).add(p31);
		 cell31.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell31);
		 Paragraph p4 =new Paragraph(String.valueOf(periodBlRepayAmtSum));
		 p4.setFontSize(8);
		 Cell cell4 =new Cell().setFont(font).add(p4);
		 cell4.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell4);
		 Paragraph p41 =new Paragraph(String.valueOf(periodYhPayAmtSum));
		 p41.setFontSize(8);
		 Cell cell41 =new Cell().setFont(font).add(p41);
		 cell41.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell41);
		 Paragraph p5 =new Paragraph("-");
		 p5.setFontSize(8);
		 Cell cell5 =new Cell().setFont(font).add(p5);
		 cell5.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell5);
		 
		 Paragraph p51 =new Paragraph("-");
		 p51.setFontSize(8);
		 Cell cell51 =new Cell().setFont(font).add(p51);
		 cell51.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell51);
		 
		 Paragraph p52 =new Paragraph("-");
		 p52.setFontSize(8);
		 Cell cell52 =new Cell().setFont(font).add(p52);
		 cell52.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell52);
		 
		 Paragraph p6 =new Paragraph(String.valueOf(currentMoneySum));
		 p6.setFontSize(8);
		 Cell cell6 =new Cell().setFont(font).add(p6);
		 cell6.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell6);
		 
		 Paragraph p61 =new Paragraph(String.valueOf(marketingFeeYiSum));
		 p61.setFontSize(8);
		 Cell cell61 =new Cell().setFont(font).add(p61);
		 cell61.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell61);
		 
		 Paragraph p7 =new Paragraph(String.valueOf(interestSum));
		 p7.setFontSize(8);
		 Cell cell7 =new Cell().setFont(font).add(p7);
		 cell7.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell7);
		
		 
		 Paragraph p8 =new Paragraph(String.valueOf(lcMoneySum));
		 p8.setFontSize(8);
		 Cell cell8 =new Cell().setFont(font).add(p8);
		 cell8.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell8);
		 
		 Paragraph p9 =new Paragraph(String.valueOf(serviceChargeYiSum));
		 p9.setFontSize(8);
		 Cell cell9 =new Cell().setFont(font).add(p9);
		 cell9.setTextAlignment(TextAlignment.CENTER);
		 table.addCell(cell9);
	}

	
	// 添加表格 会根据传经来的rowSpan合并列
	public static void setTable(Table table, List<String> fieldName, List<Map<String, Object>> map,
			List<String> rowSpan, PdfFont font) throws Exception {
		boolean flag = true;

		for (Map<String, Object> tempMap : map) {
			for (int i = 0; i < fieldName.size(); i++) {
				String name = fieldName.get(i);
				String text = tempMap.get(name) + "";
				if (rowSpan != null && rowSpan.size() > 0 && rowSpan.contains(name)) {
					if (!flag) {
						continue;
					}
					 Paragraph p =new Paragraph(text);
					 p.setFontSize(8);
					 Cell cell =new Cell(map.size(), 1).setFont(font).add(p);
					 cell.setTextAlignment(TextAlignment.CENTER);
					table.addCell(cell);
				} else {
					 Paragraph p =new Paragraph(text);
					 p.setFontSize(8);
					 Cell cell =new Cell().setFont(font).add(p);
					 cell.setTextAlignment(TextAlignment.CENTER);
					table.addCell(cell);
				}

			}
			flag = false;
		}
	}

	// 字体
	public static PdfFont chineseFont() throws Exception {
		// PdfFont chinese = PdfFontFactory.createFont("STSongStd-Light",
		// "UniGB-UCS2-H", false);
		// PdfFont sysFont =
		String prefixFont = "";

		String os = System.getProperties().getProperty("os.name");
		if (os.startsWith("win") || os.startsWith("Win")) {
			prefixFont = "C:\\Windows\\Fonts" + File.separator + "MSYH.TTF";
		} else {
			prefixFont = "/usr/share/fonts/chinese" + File.separator + "msyh.ttf";
		}
		PdfFont chinese = PdfFontFactory.createFont(prefixFont, PdfEncodings.IDENTITY_H, false);
		// PdfFont chinese = PdfFontFactory.createRegisteredFont("宋体",
		// PdfEncodings.IDENTITY_H);
		return chinese;
	}

	public static PageSize getHalfPageSize(Rectangle pagesize) {
		float width = pagesize.getWidth();
		float height = pagesize.getHeight();
		return new PageSize(width, height);
	}




}
