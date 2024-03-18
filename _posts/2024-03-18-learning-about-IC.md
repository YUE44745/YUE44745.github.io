---
layout: single
title:  "Learing about IC"
# date:   2024-02-15 22:27 +0800
# categories: "Life&Emotions"
# categories: "Circuit-Comprehension"
# categories: "Tech-"
categories: "IC"

# excerpt: "A practice in learning the headers."
# tagline: # "A little different with the *excerpt* by using the *tagline*. "

# classes: wide
# toc: true # default false

header:
    image: /assets/images/2024-03-18-learning-about-IC/IMG_20240312_174914.jpg
    
    # overlay_color: "#333"

    # overlay_image: /assets/images/three-beauty-maybe1280px.png
    # overlay_filter: 0.5
    # actions:
    #     - label: "About the unsplash"
    #       url: "https://unsplash.com"

    caption: ""
    
    teaser: "/assets/images/2024-03-18-learning-about-IC/IMG_20240312_190554.jpg"
---
## 工作中的一些心得
对于细致的东西要完全的放在心上，电路的每一个原理，对应的版图器件等等知识都要细致地掌握，才能避免一些问题的出现。


<!-- ## 周报写一些哪些内容
- latch
- flip flip种种类型
- 工艺课程中学到的一些做个总结（闩锁效应等等）
- 学习biplor等等相关的公式以及和cmos的区别
- 二极管连接方式的mos管为什么叫二极管连接
- 反相器链的扇出怎样是最高效的（在功耗和速度方面，为什么是3倍）
- ![alt text](/assets/images/2024-03-18-learning-about-IC/image-16.png)



## 反相器
开关阈值：vin=vout时和 -->


## 为什么mos的二极管接法叫二极管接法
从仿真来看，当body短接源极时，且由于二极管连接是drain和gate短接，所以nmos管可以看做一个双端口器件，其输出电压电流曲线和二极管的电压电流曲线来进行比较。由此推测其输出曲线和二极管反向击穿时的曲线有相像之处。
![alt text](/assets/images/2024-03-18-learning-about-IC/image-17.png)
![alt text](/assets/images/2024-03-18-learning-about-IC/image-18.png)


## TTL(transitor-transitor logic)和COMS(Complementary Metal-Oxide-Semiconductor Transistor)
这两种技术都是常用于数字电路设计中。TTL使用的为bjt(biplor junction transitor),但CMOS使用的是mos管。TTL一般工作电压高于CMOS。TTL因为是电流驱动，所以工作速度更高，但是带来的缺点就是功耗太高。TTL由于噪声容限更小所以抗干扰能力更弱。
在CMOS模拟电路设计中，不经常用到bjt，可以使用bjt来生成一个正温度和负温度系数电压，从而可以生成不与温度相关的电压。
![alt text](/assets/images/2024-03-18-learning-about-IC/image-22.png)
## latch和flip-flop
两者是在数字电路设计中的时序电路的核心部件。对于电平敏感的位置latch（锁存器），对于边沿敏感的是（触发器）
1. S-R锁存器
该锁存器由两个或非门组成，如图所示为其原理图和真值表。
![alt text](/assets/images/2024-03-18-learning-about-IC/image-19.png)
需要关注的是什么情况下会出现亚稳态：当两个输入同时由1变为0的时候，这个同时所指的时间范围由门电路传播的延时所决定。或者在电路处于稳态时，给其中任意一端加的1脉冲时间太短也会造成亚稳态.
2. !S-!R锁存器
其本质即将其实就是将SR锁存器的输出端口全部取反，之所以这样做的原因是，根据buble to buble design（圈到圈）设计原理如下图所示
![alt text](/assets/images/2024-03-18-learning-about-IC/image-20.png)
更加常用的原因是在同样驱动能力下，与非门相对于或非门的面积为4比5，也就是说同样面积下与非门的驱动能力更强。
3. 触发器
触发器为对边沿敏感的器件，当为上升沿或者下降沿的时候进行数据的读取，需要注意的是建立时间和保持时间，否则容易进入亚稳态。建立时间setup time要求在时钟沿之前输入信号不再变化，保持时间holdup time要求时钟沿之后的一段时间内输入信号不产生变化。

在整理stdcell的时候遇到了很多类似如下图的锁存器，也有很多由这些组成的触发器。
![alt text](/assets/images/2024-03-18-learning-about-IC/image-21.png)
通过使用一个三态非门加非门的形式来出储存数据，其中输入处也有一个三态非门，当输入信号的三态非门通行时，锁存器中的三态非门处于高阻态，信号可以写入，当输入信号的三态门处于高阻时，环路处的三态非门导通，形成的一个双稳态电路。而级联像这样的结构就可以形成一个触发器。

## 反相器的扇出
在一个CMOS反相器中，扇出（fan-out）是指一个反相器能够驱动多少个同类逻辑门而不引起输出信号显著失真。
反相器的尺寸增大时，可以获得更大的电流，用更少的时间来对后面的电容充电或者放电，但同时更大的尺寸也就意味着自身的电容较大，那么上一级对本级充放电这会增加传播延时。
分两种情况讨论，当已经确定了反相器链的级数之后，只要保证每一级的放大比例是相同的就可以使得延迟是最小。
更为常见的是另一种情况，输出的级数没有确定，每一级放大的比例也没有确定，唯一确定最终的输出是输入的F倍，推导如下。
![alt text](/assets/images/2024-03-18-learning-about-IC/image-23.png)

## 工艺方面
早期栅极使用的是金属为什么现在使用多晶硅？
其原因是在MIS机构中，使得半导体区域进入强反型的电压为VTH，而这个电压受到了mental和semiconductor之间的功函数只差的影响。而金属很难控制这种差异，且由于自对准工艺中遮挡掺杂离子，从而自动形成源漏区域。但是当工艺缩小到45nm之后，面临着漏电流增大，需要选择高k材料来替代二氧化硅作为绝缘层，从而无法再继续在上面形成多晶硅，所以也有用金属来作为栅极情况。
<!-- 闩锁效应是因为有两个 -->

## 标准库
SMIC 0.18um V3E BCD Process UHD RVT
Standard Cell Library Data-Book V0.1c
解释：
BCD工艺：Bipolar-CMOS-DMOS，一种集成双极型、CMOS和DMOS器件的混合信号工艺技术，主要用于模拟、电源管理和其他混合信号集成电路设计。
UHD：Ultra High Voltage，超高压。
RVT：Regular Voltage Transistor
其中：
DMOS：![alt text](/assets/images/2024-03-18-learning-about-IC/image-6.png)
适合生产功率器件的DMOS（双扩散金属氧化物半导体）工艺，DMOS功率器件具有高压、大电流的特点。
和RVT相对应的是HVT（High-Voltage Transistor，高压晶体管）和LVT（Low-Voltage Transistor，低压晶体管）:
HVT：具有较高的阈值电压，其优点在于开启状态下的漏电流小，因此静态功耗较低，但缺点是开关速度较慢，适用于对功耗敏感且对速度要求不高的电路部分。
RVT（有时也称为SVT，Standard Voltage Transistor 或 Regular Voltage Transistor）：具有中等阈值电压，它的性能介于HVT和LVT之间，提供适中的开关速度和漏电流水平，适合用于一般的逻辑和模拟电路设计。
LVT：具有较低的阈值电压，开关速度快，但漏电流相对较大，导致静态功耗较高，适合对速度有严格要求而对功耗容忍度较大的电路部分。
为什么在IO电路中使用有着更厚栅氧化层的管子，而在core电路中使用栅氧化层的管子。
<!-- ![alt text](最小尺寸.png) -->
因为更厚栅氧化层意味着更高的开启电压，更低的开关速度，更低的功耗。IO电路的速度要求没有核心电路要求高，所以对功耗进行了权衡。
<!-- 查看仿真.lib文件中nh_mis_ckt和nhvt12ll_mis_ckt的电晶体模型，如下：
![alt text](/assets/images/2024-03-18-learning-about-IC/image-15.png)
![alt text](/assets/images/2024-03-18-learning-about-IC/image-14.png) -->


## 一些小tips在使用virtuoso
1. 通过查看netlist文件来查看是否所有元件已经改完。
    如果要查看一个库里面的所有的元件是否已经完全替换，例如将p12ll替换为phvt12ll，将n12ll替换为nhvt12ll，那么在替换完成成，选择下面这个方法检查会比较快捷。
    首先将这个库里面的所有元件放入一个原理图中，如下。
    ![alt text](image.png)
    那么这里面是包含了所有的元件的信息。保存后打开ADE L，在仿真界面点击生成netlist，如下。
    ![alt text](/assets/images/2024-03-18-learning-about-IC/image-1.png)
    之后选择保存该文件，就可以查看所用到的器件类型，以及宽长比等种种信息，从而进行检查，而不需要繁琐地点开每一个浏览来检查。如下。
    ![alt text](/assets/images/2024-03-18-learning-about-IC/image-2.png)
2. 在原理图中创建文本，可以点击create-->note-->text
3. 按9可以高亮同一net，在view里面也可以选择highlight nets有着更好的效果，可以会显示net之间的网络关系，对于理解版图反向出来的电路很有用。
4. cds.lib文件可以直接进行对库文件的更改，非常有用。