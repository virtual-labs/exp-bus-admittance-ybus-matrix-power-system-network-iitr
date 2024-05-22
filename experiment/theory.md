
<div style="font-family: 'Nunito Sans', sans-serif; font-size: 20px;text-align: justify;">
<h2>Introduction</h2>

The Y-Bus matrix is a key component in load flow analysis, providing a mathematical representation of the power system network. It is a sparse symmetric matrix that characterizes the admittance (or inverse of impedance) between all pairs of connected buses in a power system. By forming the Y-Bus matrix, we can efficiently solve load flow equations to determine the steady-state operating conditions of the power system network. The load flow studies are the backbone of the power system analysis and design. They are necessary for the planning, operation, economic dispatch, and exchange of power between utilities..<br>

### Y Bus Matrix Formation

To obtain Y-Bus matrix for the interconnected power system, consider a simple network shown in Figure 1. The impedances of the lines are expressed in per unit on a common MVA base. The resistances of the interconnected lines are neglected for the simplicity. For the analysis node-voltage equations need to be considered which is based on Kirchoff’s current law. So that the impedances of the interconnected lines need to be converted to admittances as per the formula given below – 
<br>
<center>  y<sub>ij</sub> = 1/z<sub>ij</sub> = 1/(r<sub>ij</sub> + x<sub>ij</sub>)  ..........(1)</center><br>
<br>

<center><img src="images/figure1.png" style=" height: 280px" align="center"></center><br>
<center><b>Fig 1: Impedance diagram of 4-bus interconnected power system network.</b></center><br>

<br>
<center><img src="images/figure2.png" style=" height: 280px" align="center"></center><br>
<center><b>Fig 2: Admittance diagram for 4-bus interconnected power system network.</b></center><br>


The admittance diagram for the 4-bus interconnected power system is shown in Figure 2, where node 0 is taken as the reference (normally ground). Applying KCL to the all buses (nodes), the node-voltage equations are given below – <br>

<br>
<center>  I<sub>1</sub> = y<sub>10</sub>V<sub>1</sub> + y<sub>12</sub>(V<sub>1</sub> - V<sub>2</sub>) + y<sub>13</sub>(V<sub>1</sub> - V<sub>3</sub>)  ...........(2)</center><br>
<br>

<br>
<center>  I<sub>2</sub> = y<sub>20</sub>V<sub>2</sub> + y<sub>12</sub>(V<sub>2</sub> - V<sub>1</sub>) + y<sub>23</sub>(V<sub>2</sub> - V<sub>3</sub>)  ...........(3)</center><br>
<br>

<br>
<center>  0 = y<sub>23</sub>(V<sub>3</sub> - V<sub>2</sub>) + y<sub>13</sub>(V<sub>3</sub> - V<sub>1</sub>) + y<sub>34</sub>(V<sub>3</sub> - V<sub>4</sub>)  ...........(4)</center><br>
<br>

<br>
<center>  0 = y<sub>34</sub>(V<sub>4</sub> - V<sub>3</sub>) ...........(5)
</center><br>
<br>

Rearranging the terms – 


<br>
<center> 
  I<sub>1</sub> = (y<sub>10</sub> + y<sub>12</sub> + y<sub>13</sub>)V<sub>1</sub> - y<sub>12</sub>V<sub>2</sub> - y<sub>13</sub>V<sub>3</sub> ...........(6)
<center><br>
<br>


<br>
<center> 
  I<sub>2</sub> = -y<sub>12</sub>V<sub>1</sub> + (y<sub>20</sub> + y<sub>12</sub> + y<sub>23</sub>)V<sub>2</sub> - y<sub>23</sub>V<sub>3</sub> ..........(7)
<center><br>
<br>


<br>
<center> 
  0 = -y<sub>13</sub>V<sub>1</sub> - y<sub>23</sub>V<sub>2</sub> + (y<sub>13</sub> + y<sub>23</sub> + y<sub>34</sub>)V<sub>3</sub> - y<sub>34</sub>V<sub>4</sub> ...........(8)
<center><br>
<br>


<br>
<center> 
  0 = -y<sub>34</sub>V<sub>3</sub> + y<sub>34</sub>V<sub>4</sub> ...........(9)
<center><br>
<br>

Writing equations in the matrix form – 

<div style="text-align: center;">
  <strong>Matrix Equation:</strong><br>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>I<sub>1</sub></td>
      </tr>
      <tr>
        <td>I<sub>2</sub></td>
      </tr>
      <tr>
        <td>I<sub>3</sub></td>
      </tr>
      <tr>
        <td>I<sub>4</sub></td>
      </tr>
    </table>
  </div>
  <span>=</span>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px; margin-left: 5px; margin-right: 5px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>Y<sub>11</sub></td>
        <td>Y<sub>12</sub></td>
        <td>Y<sub>13</sub></td>
        <td>Y<sub>14</sub></td>
      </tr>
      <tr>
        <td>Y<sub>21</sub></td>
        <td>Y<sub>22</sub></td>
        <td>Y<sub>23</sub></td>
        <td>Y<sub>24</sub></td>
      </tr>
      <tr>
        <td>Y<sub>31</sub></td>
        <td>Y<sub>32</sub></td>
        <td>Y<sub>33</sub></td>
        <td>Y<sub>34</sub></td>
      </tr>
      <tr>
        <td>Y<sub>41</sub></td>
        <td>Y<sub>42</sub></td>
        <td>Y<sub>43</sub></td>
        <td>Y<sub>44</sub></td>
      </tr>
    </table>
  </div>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>V<sub>1</sub></td>
      </tr>
      <tr>
        <td>V<sub>2</sub></td>
      </tr>
      <tr>
        <td>V<sub>3</sub></td>
      </tr>
      <tr>
        <td>V<sub>4</sub></td>
      </tr>
    </table>
  </div>
</div>

Then – 


<ul>
  Y<sub>11</sub> = (y<sub>10</sub> + y<sub>12</sub> + y<sub>13</sub>)

  Y<sub>22</sub> = (y<sub>20</sub> + y<sub>12</sub> + y<sub>23</sub>)

  Y<sub>33</sub> = (y<sub>13</sub> + y<sub>23</sub> + y<sub>34</sub>)

  Y<sub>44</sub> = y<sub>34</sub>

  Y<sub>12</sub> = Y<sub>21</sub> = -y<sub>12</sub>

  Y<sub>13</sub> = Y<sub>31</sub> = -y<sub>13</sub>

  Y<sub>23</sub> = Y<sub>32</sub> = -y<sub>23</sub>

  Y<sub>34</sub> = Y<sub>43</sub> = -y<sub>34</sub>
</ul>

In this network, there is no interconnection for the bus 4 with the bus 1 and 2. Due to this-


<ul>
  Y<sub>14</sub> = Y<sub>41</sub> = 0
  
  
  Y<sub>24</sub> = Y<sub>42</sub> = 0
</ul>

Generalized Y-bus node-voltage equations for the n-bus interconnected power system network is given below – 

<div style="text-align: center;">
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr><td>I<sub>1</sub></td></tr>
      <tr><td>I<sub>2</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>I<sub>i</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>I<sub>n</sub></td></tr>
    </table>
  </div>
  <span>=</span>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px; margin-left: 5px; margin-right: 5px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr>
        <td>Y<sub>11</sub></td>
        <td>Y<sub>12</sub></td>
        <td>...</td>
        <td>Y<sub>1i</sub></td>
        <td>...</td>
        <td>Y<sub>1n</sub></td>
      </tr>
      <tr>
        <td>Y<sub>21</sub></td>
        <td>Y<sub>22</sub></td>
        <td>...</td>
        <td>Y<sub>2i</sub></td>
        <td>...</td>
        <td>Y<sub>2n</sub></td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
      <tr>
        <td>Y<sub>3i</sub></td>
        <td>Y<sub>32</sub></td>
        <td>...</td>
        <td>Y<sub>3i</sub></td>
        <td>...</td>
        <td>Y<sub>3n</sub></td>
      </tr>
      <tr>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
        <td>...</td>
      </tr>
      <tr>
        <td>Y<sub>4i</sub></td>
        <td>Y<sub>42</sub></td>
        <td>...</td>
        <td>Y<sub>4i</sub></td>
        <td>...</td>
        <td>Y<sub>4n</sub></td>
      </tr>
    </table>
  </div>
  <div style="display: inline-block; vertical-align: middle; margin-top: 10px;">
    <table border="1" style="border-collapse: collapse; margin: 0 auto;">
      <tr><td>V<sub>1</sub></td></tr>
      <tr><td>V<sub>2</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>V<sub>i</sub></td></tr>
      <tr><td>...</td></tr>
      <tr><td>V<sub>n</sub></td></tr>
    </table>
  </div>
</div>


<ul>
  I<sub>bus</sub> = Y<sub>bus</sub>.V<sub>bus</sub>
</ul>


Where, I<sub>bus</sub> is the vector of the injected bus currents and V<sub>bus</sub>  is the vector of bus voltages measured from the reference node. Y<sub>bus</sub>  is known as the bus admittance matrix.

With the above explanation, it can be observed that the – 

•	The diagonal element of each node is the sum of admittances connected to it. It is known as self-admittance or driving point admittance. It can be calculated as – 

<p align="center">
  <span style="font-family: 'Times New Roman', Times, serif; font-size: 24px;">
    Y<sub>ii</sub> = 
    <span style="font-size: 30px; display: inline-block; vertical-align: middle;">
      <span style="display: block; text-align: center;">n</span>
      &sum;
      <span style="display: block; text-align: center;">i,j=0</span>
    </span>
    y<sub>ij</sub>
  </span>
  <span style="font-family: 'Arial', sans-serif; font-size: 24px;">&nbsp;&nbsp; (j &ne; i)</span>
</p>


•	The diagonal element of each node is the sum of admittances connected to it. It is known as self-admittance or driving point admittance. It can be calculated as – 

Y<sub>ij</sub> = Y<sub>ji</sub> = -y<sub>ij</sub> 

The Y-bus matrix is symmetric along the leading diagonal, due to this only upper triangular nodal admittance matrix is required and it will improve the computational performance. Also, the Y-bus matrix is sparse matrix due to the interconnection of each bus with only a few nearby buses.