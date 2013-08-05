/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.border.Border;
import javax.swing.border.LineBorder;
import javax.swing.border.MatteBorder;

/**
 *
 * @author guilherme
 */
public class ChemisSideBar extends javax.swing.JPanel {

    private BoxLayout layoutBox;
    private static Dimension rigidAreaDimension=new Dimension(0,8);
    /**
     * Creates new form ChemisSideBar
     */
    public ChemisSideBar() {
        initComponents();
        layoutBox=new BoxLayout(this,BoxLayout.PAGE_AXIS);
        setLayout(layoutBox);
        setBorder(new MatteBorder(0,0,0,1, Color.black));
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;
        g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        int w = getWidth();
        int h = getHeight();
        Color color1 = new Color(0xBC, 0xB0, 0xB0);
        //Color color1 = new Color(0x80, 0x00, 0x80);
        Color color2 = new Color(0xD9,0xD9,0xD9);
        //Color color2 = new Color(0xA3,0X4F,0XA3);
        GradientPaint gp = new GradientPaint(10, 0, color1, w, 0, color2);
        g2d.setPaint(gp);
        g2d.fillRect(0, 0, w, h);
    }

    public void addLauncher(ChemisLauncher chemisLauncher){
        add(Box.createRigidArea(rigidAreaDimension));
        add(chemisLauncher);
    }
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        setBackground(new java.awt.Color(217, 87, 190));
        setMaximumSize(new java.awt.Dimension(80, 32767));
        setMinimumSize(new java.awt.Dimension(80, 240));
        setPreferredSize(new java.awt.Dimension(80, 300));
        setLayout(null);
    }// </editor-fold>//GEN-END:initComponents
    // Variables declaration - do not modify//GEN-BEGIN:variables
    // End of variables declaration//GEN-END:variables
}