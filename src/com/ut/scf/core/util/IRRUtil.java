package com.ut.scf.core.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.junit.Test;


public class IRRUtil {

	 public static double irr(double[] income) {
	        return irr(income, 0.1D);
	    }
	 
    public static double irr(double[] values, double guess) {
        int maxIterationCount = 20;
        double absoluteAccuracy = 1.0E-007D;
 
        double x0 = guess;
 
        int i = 0;
        while (i < maxIterationCount) {
            double fValue = 0.0D;
            double fDerivative = 0.0D;
            for (int k = 0; k < values.length; k++) {
                fValue += values[k] / Math.pow(1.0D + x0, k);
                fDerivative += -k * values[k] / Math.pow(1.0D + x0, k + 1);
            }
            double x1 = x0 - fValue / fDerivative;
            if (Math.abs(x1 - x0) <= absoluteAccuracy) {
                return x1;
            }
            x0 = x1;
            i++;
        }
        return (0.0D / 0.0D);
    }
    @Test
    public  void test() {
        double[] income = {-1000,100,200,5,60,45,-10,60};
        double ret = irr(income,0.00001d) ;
        System.out.println(new BigDecimal(ret));
 
    }
}
